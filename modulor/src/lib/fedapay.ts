const FEDAPAY_BASE =
  process.env.FEDAPAY_ENV === "live"
    ? "https://api.fedapay.com/v1"
    : "https://api.sandbox.fedapay.com/v1";

const SECRET_KEY = process.env.FEDAPAY_SECRET_KEY ?? "";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SECRET_KEY}`,
  };
}

export interface FedaPayCustomer {
  firstname: string;
  lastname:  string;
  email:     string;
  phone?:    string;
}

export interface CreateTransactionParams {
  description:   string;
  amount:        number;      // en CFA (entier)
  customer:      FedaPayCustomer;
  callbackUrl:   string;
  customMetadata?: Record<string, unknown>;
}

export interface FedaPayTransaction {
  id:        number;
  reference: string;
  amount:    number;
  status:    string;
}

/* ─── Créer une transaction FedaPay et obtenir l'URL de paiement ──── */
export async function createCheckout(params: CreateTransactionParams): Promise<{
  transactionId: number;
  paymentUrl: string;
}> {
  /* 1. Créer la transaction */
  const txRes = await fetch(`${FEDAPAY_BASE}/transactions`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      description: params.description,
      amount:      params.amount,
      currency:    { iso: "XOF" },
      customer: {
        firstname: params.customer.firstname,
        lastname:  params.customer.lastname,
        email:     params.customer.email,
        ...(params.customer.phone
          ? { phone_number: { number: params.customer.phone, country: "bj" } }
          : {}),
      },
      callback_url:    params.callbackUrl,
      custom_metadata: params.customMetadata,
    }),
  });

  if (!txRes.ok) {
    const err = await txRes.text();
    throw new Error(`FedaPay create transaction failed: ${err}`);
  }

  const txData = await txRes.json();
  const txId: number = txData["v1/transaction"]?.id ?? txData.id;

  /* 2. Générer le token de paiement */
  const tokenRes = await fetch(`${FEDAPAY_BASE}/transactions/${txId}/token`, {
    method: "POST",
    headers: headers(),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`FedaPay token generation failed: ${err}`);
  }

  const tokenData = await tokenRes.json();
  const token: string = tokenData.token;

  return {
    transactionId: txId,
    paymentUrl: `https://checkout.fedapay.com/?token=${token}`,
  };
}

/* ─── Récupérer une transaction par son ID ───────────────────────── */
export async function getTransaction(fedapayId: string | number): Promise<FedaPayTransaction> {
  const res = await fetch(`${FEDAPAY_BASE}/transactions/${fedapayId}`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error("FedaPay: cannot fetch transaction");
  const data = await res.json();
  return data["v1/transaction"] ?? data;
}
