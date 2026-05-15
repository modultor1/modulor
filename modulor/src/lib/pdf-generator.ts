import PDFDocument from "pdfkit";
import { Readable } from "stream";

export interface CertificateData {
  prenoms: string;
  nom: string;
  formationTitre: string;
  date: string;
  duree: string;
  score: number;
}

/* Générer un PDF certificat avec les couleurs Modulor */
export function generateCertificatePDF(data: CertificateData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      bufferPages: true,
      size: "A4",
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      resolve(pdfBuffer);
    });
    doc.on("error", reject);

    /* Background */
    doc.fillColor("#ffffff").rect(0, 0, 595, 842).fill();

    /* Border décoratif */
    doc.strokeColor("#2934f2").lineWidth(3);
    doc.rect(20, 20, 555, 802).stroke();

    doc.strokeColor("#57f27d").lineWidth(2);
    doc.rect(30, 30, 535, 782).stroke();

    /* Logo / Titre */
    doc.fontSize(48).fillColor("#2934f2").font("Helvetica-Bold");
    doc.text("CERTIFICAT", 50, 80, { align: "center", width: 495 });

    doc.fontSize(18).fillColor("#57f27d");
    doc.text("DE COMPLÉTION", 50, 140, { align: "center", width: 495 });

    /* Ligne décorative */
    doc.moveTo(150, 170).lineTo(445, 170).strokeColor("#2934f2").stroke();

    /* Texte introductif */
    doc.fontSize(14).fillColor("#333333").font("Helvetica");
    doc.text("Ceci certifie que", 50, 210, { align: "center", width: 495 });

    /* Nom du participant */
    doc.fontSize(32).fillColor("#2934f2").font("Helvetica-Bold");
    doc.text(
      `${data.prenoms} ${data.nom}`.toUpperCase(),
      50,
      250,
      { align: "center", width: 495 }
    );

    /* Texte description */
    doc.fontSize(13).fillColor("#333333").font("Helvetica");
    doc.text("a complété avec succès la formation", 50, 310, {
      align: "center",
      width: 495,
    });

    /* Titre formation */
    doc.fontSize(18).fillColor("#57f27d").font("Helvetica-Bold");
    doc.text(data.formationTitre, 50, 350, { align: "center", width: 495 });

    /* Details */
    doc.fontSize(11).fillColor("#666666").font("Helvetica");

    const leftCol = 80;
    const rightCol = 380;
    const detailsTop = 430;

    doc.text("Date de complétion :", leftCol, detailsTop);
    doc.fillColor("#2934f2").font("Helvetica-Bold");
    doc.text(data.date, leftCol + 120, detailsTop);

    doc.fillColor("#666666").font("Helvetica");
    doc.text("Durée :", leftCol, detailsTop + 30);
    doc.fillColor("#2934f2").font("Helvetica-Bold");
    doc.text(data.duree, leftCol + 120, detailsTop + 30);

    doc.fillColor("#666666").font("Helvetica");
    doc.text("Score obtenu :", rightCol, detailsTop);
    doc.fillColor("#57f27d").font("Helvetica-Bold");
    doc.text(`${data.score}/100`, rightCol + 120, detailsTop);

    /* Signature section */
    doc.fontSize(10).fillColor("#999999").font("Helvetica");
    doc.text("Certifié par", 50, 600, { align: "center", width: 495 });

    doc.fontSize(16).fillColor("#2934f2").font("Helvetica-Bold");
    doc.text("Modulor", 50, 625, { align: "center", width: 495 });

    doc.fontSize(10).fillColor("#999999").font("Helvetica");
    doc.text("Plateforme d'apprentissage en ligne", 50, 650, {
      align: "center",
      width: 495,
    });

    /* Footer */
    doc.fontSize(9).fillColor("#999999");
    doc.text(
      `Certificat généré le ${new Date().toLocaleDateString("fr-FR")} • https://modulor.bj`,
      50,
      780,
      { align: "center", width: 495 }
    );

    doc.end();
  });
}
