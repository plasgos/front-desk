// import { Document, Page, Text, View } from "@react-pdf/renderer";
// import React from "react";
// import { Invoice } from "./Invoice";
// import { invoiceData } from "./InvoiceLabelSetting";

// const InvoiceDownload = () => {
//   const styles = StyleSheet.create({
//     page: {
//       flexDirection: "row",
//       backgroundColor: "#E4E4E4",
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1,
//     },
//   });

//   return (
//     <Document>
//       {invoiceData.map((invoice, index) => {
//         return (
//           <Page size="A6" key={index} style={styles.page}>
//             {/* <Invoice
//               barcode={invoice.barcode}
//               isCod={invoice.isCod}
//               price={invoice.price}
//               service={invoice.service}
//               qty={invoice.qty}
//               weight={invoice.weight}
//               receiver={invoice.receiver}
//               sender={invoice.sender}
//               products={invoice.products}
//             /> */}

//             <View style={styles.section}>
//               <Text>{invoice.sender.name}</Text>
//               <Text>{invoice.sender.address}</Text>
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// };

// export default InvoiceDownload;
