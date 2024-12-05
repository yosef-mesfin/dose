// 'use server';
// import pdfParse from 'pdf-parse';

// // extract text from pdf
// export const extractTextFromPdf = async (file: File): Promise<string> => {
//   const buffer = await file.arrayBuffer();
//   const data = await pdfParse(Buffer.from(buffer));

//   if (data && data.text) {
//     return data.text.trim();
//   } else {
//     throw new Error('Failed to extract text from pdf');
//   }
// };
