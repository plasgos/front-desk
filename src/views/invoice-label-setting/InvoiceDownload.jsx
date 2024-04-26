import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  Image,
  Svg,
  View,
} from "@react-pdf/renderer";
import Barcode from "react-barcode";
import { formatPrice } from "../../lib";
import { CgDanger } from "react-icons/cg";
import kiriminaja from "../../assets/KiriminAja-Logo.svg";
import jne from "../../assets/jne-logo.png";
import { invoiceData } from "./InvoiceLabelSetting";

const InvoiceDownload = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
    },
    mainContainer: {
      width: "105mm",
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 0.5,
      borderColor: "black",
      padding: 10,
    },
    rightImage: {
      width: 60,
      height: "100%",
    },
    barcodeContainer: {
      padding: 5,
      borderBottomWidth: 0.5,
      borderColor: "black",
      textAlign: "center",
    },
    priceContainer: {
      textAlign: "center",
      padding: 8,
      borderBottomWidth: 0.5,
      borderColor: "black",
    },
    serviceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    asuransiContainer: {
      fontSize: 12,
      flexDirection: "row",
      padding: 10,
    },
    noteContainer: {
      fontSize: 12,
      padding: 10,
    },
    addressContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: 2,
      borderColor: "grey",
    },
    productContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "black",
    },
    productText: {
      fontWeight: "bold",
    },
    italicStyle: {
      fontStyle: "italic",
    },
  });

  return (
    <Document>
      {invoiceData.map((invoice, index) => (
        <Page size="A6" key={index} style={styles.page}>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Image src={kiriminaja} style={{ width: 80, height: "100%" }} />
              <Image src={jne} style={styles.rightImage} />
            </View>
            <View style={styles.barcodeContainer}>
              <Barcode value={invoice.barcode} width={2.5} height={40} />
            </View>
            <View style={styles.priceContainer}>
              <Text
                style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
              >
                {invoice.isCod ? "COD" : "NON COD"} :{" "}
                {formatPrice(invoice.price)}
              </Text>
            </View>
            <View style={styles.serviceContainer}>
              <View>
                <Text
                  style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
                >
                  Jenis Layanan : {invoice.service}
                </Text>
              </View>
              <View style={{ fontSize: 12 }}>
                <View>
                  <Text>Asuransi Rp 0,-</Text>
                  <Text>Berat {invoice.weight} gr</Text>
                  <Text>Quantity : {invoice.qty}Pcs</Text>
                </View>
              </View>
            </View>
            <View style={styles.asuransiContainer}>
              <View>
                <Text style={{ fontStyle: "italic" }}>
                  <CgDanger size={18} style={{ marginRight: 2 }} />
                  Penjual tidak perlu bayar apapun ke kurir, sudah di bayarkan
                  otomatis
                </Text>
              </View>
            </View>
            <View style={styles.addressContainer}>
              <View>
                <Text style={{ fontWeight: "bold" }}>Penerima</Text>
                <Text>{invoice.receiver.name}</Text>
                <Text>
                  {invoice.receiver.phoneNumber} | {invoice.receiver.address}
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Pengirim</Text>
                <Text>{invoice.sender.name}</Text>
                <Text>
                  {invoice.sender.phoneNumber} | {invoice.sender.address}
                </Text>
              </View>
            </View>
            <View style={styles.productContainer}>
              <View>
                <Text style={styles.productText}>Produk</Text>
                <Text>1. {invoice.products.name}</Text>
                <Text>Keterangan : {invoice.products.description}</Text>
              </View>
              <View>
                <Text style={styles.productText}>Jumlah</Text>
                <Text style={{ textAlign: "right" }}>
                  {invoice.products.qty} pcs
                </Text>
              </View>
            </View>
            <View style={styles.noteContainer}>
              <Text>Catatan :</Text>
              <Text style={styles.italicStyle}>
                * Pengirim wajib meminta bukti serah terima paket ke kurir
              </Text>
              <Text style={styles.italicStyle}>
                * Jika paket ini retur, pengirim tetap di kenakan biaya
                keberangkatan dan biaya retur sesuai ekspedisi
              </Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default InvoiceDownload;
