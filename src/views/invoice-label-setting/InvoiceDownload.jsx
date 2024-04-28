import React from "react";
import { Document, Page, Text, Image, View, Font } from "@react-pdf/renderer";
import { formatPrice } from "../../lib";
import kiriminaja from "../../assets/kirimin-aja-png.png";
import JsBarcode from "jsbarcode";
import jne from "../../assets/jne-logo.png";
import warningIcon from "../../assets/exclamation.png";

const InvoiceDownload = ({ isSelectedA6, isSelectedA4 }) => {
  console.log("🚀 ~ InvoiceDownload ~ isSelectedA6:", isSelectedA6);
  let canvas;

  return (
    <Document>
      {isSelectedA6 ? (
        <Page size="A6">
          {[...Array(2)].map((_, i) => {
            canvas = document.createElement("canvas");
            JsBarcode(canvas, "AWB312121", {
              width: 3,
              height: 40,
              fontSize: 14,
              marginTop: 15,
              fontOptions: "bold",
              text: " ",
            });

            const barcode = canvas.toDataURL();

            return (
              <View
                key={i}
                style={{
                  padding: 10,
                  width: 297,
                  // width: isSelectedA6 ? "396px" : "793px",
                  // height: isSelectedA6 ? "149mm" : "297mm",
                  height: "100%",
                }}
              >
                <View style={{ border: 0.5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <Image source={kiriminaja} style={{ width: 60 }} />
                    <Image source={jne} style={{ width: 50 }} />
                  </View>

                  <View
                    style={{
                      borderTop: 0.5,
                      borderBottom: 0.5,
                      paddingHorizontal: 10,
                      paddingBottom: 5,
                    }}
                  >
                    <Image src={barcode} />

                    <Text
                      style={{
                        fontSize: 8,
                        textAlign: "center",
                        marginTop: -12,
                        letterSpacing: 1,
                      }}
                    >
                      AWB312121
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderBottom: 0.5,
                      paddingVertical: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      COD : {formatPrice(70000)}
                    </Text>
                  </View>

                  <View style={{ padding: 10, paddingBottom: 5 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 10 }}>
                          Jenisa Layanan : REG
                        </Text>
                      </View>

                      <View style={{ fontSize: 8 }}>
                        <Text>Asuransi Rp 0,-</Text>
                        <Text style={{ marginVertical: 3 }}>Berat 500 gr</Text>
                        <Text>Quantity : 1 Pcs</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        padding: 10,
                        border: 0.5,
                        borderRadius: 10,
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <Image
                        source={warningIcon}
                        style={{ width: 10, height: 10, marginRight: 3 }}
                      />
                      <Text style={{ fontSize: 8, textAlign: "center" }}>
                        Penjual tidak perlu bayar apapun ke kurir, sudah di
                        bayarkan otomatis
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "50%", marginRight: 10 }}>
                        <Text style={{ fontSize: 10, marginBottom: 2 }}>
                          Penerima
                        </Text>
                        <Text style={{ fontSize: 8, marginBottom: 5 }}>
                          John Doe
                        </Text>

                        <Text style={{ fontSize: 8, marginBottom: 4 }}>
                          089721231 | Jl. Blotan Permai No.23 RT 03/40 Jakarta
                          Tmimur
                        </Text>
                      </View>

                      <View style={{ width: "50%" }}>
                        <Text style={{ fontSize: 10, marginBottom: 2 }}>
                          Pengirim
                        </Text>
                        <Text style={{ fontSize: 8, marginBottom: 5 }}>
                          John Kenedy
                        </Text>

                        <Text style={{ fontSize: 8 }}>
                          089721231 | Jl. Blotan Permai No.23 RT 03/40 Jakarta
                          Tmimur
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{ borderBottom: 1.5, borderStyle: "dashed" }}
                  ></View>

                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 10, marginBottom: 2 }}>
                        Produk
                      </Text>
                      <Text style={{ fontSize: 8, marginBottom: 2 }}>
                        1.Label stiker barcode thermal 50x20
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 10, marginBottom: 2 }}>
                        Jumlah
                      </Text>
                      <Text style={{ fontSize: 8, marginBottom: 2 }}>
                        1 Pcs
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      padding: 10,
                      borderTop: 0.5,
                    }}
                  >
                    <Text style={{ fontSize: 8, marginBottom: 2 }}>
                      Catatan :
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                      * Pengirim wajib meminta bukti serah terima paket ke kurir
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                      * Jika paket ini retur, pengirim tetap di kenakan biaya
                      keberangkatan dan biaya retur sesuai ekspedisi
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Page>
      ) : (
        <Page size="A4">
          {[...Array(2)].map((_, i) => {
            canvas = document.createElement("canvas");
            JsBarcode(canvas, "AWB312121", {
              width: 3,
              height: 40,
              fontSize: 14,
              marginTop: 15,
              fontOptions: "bold",
              text: " ",
            });

            const barcode = canvas.toDataURL();

            return (
              <View
                key={i}
                style={{
                  padding: 10,
                  width: 297,
                  // height: isSelectedA6 ? "149mm" : "297mm",
                  height: "100%",
                }}
              >
                <View style={{ border: 0.5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <Image source={kiriminaja} style={{ width: 60 }} />
                    <Image source={jne} style={{ width: 50 }} />
                  </View>

                  <View
                    style={{
                      borderTop: 0.5,
                      borderBottom: 0.5,
                      paddingHorizontal: 10,
                      paddingBottom: 5,
                    }}
                  >
                    <Image src={barcode} />

                    <Text
                      style={{
                        fontSize: 8,
                        textAlign: "center",
                        marginTop: -12,
                        letterSpacing: 1,
                      }}
                    >
                      AWB312121
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderBottom: 0.5,
                      paddingVertical: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      COD : {formatPrice(70000)}
                    </Text>
                  </View>

                  <View style={{ padding: 10, paddingBottom: 5 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 10 }}>
                          Jenisa Layanan : REG
                        </Text>
                      </View>

                      <View style={{ fontSize: 8 }}>
                        <Text>Asuransi Rp 0,-</Text>
                        <Text style={{ marginVertical: 3 }}>Berat 500 gr</Text>
                        <Text>Quantity : 1 Pcs</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        padding: 10,
                        border: 0.5,
                        borderRadius: 10,
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <Image
                        source={warningIcon}
                        style={{ width: 10, height: 10, marginRight: 3 }}
                      />
                      <Text style={{ fontSize: 8, textAlign: "center" }}>
                        Penjual tidak perlu bayar apapun ke kurir, sudah di
                        bayarkan otomatis
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "50%", marginRight: 10 }}>
                        <Text style={{ fontSize: 10, marginBottom: 2 }}>
                          Penerima
                        </Text>
                        <Text style={{ fontSize: 8, marginBottom: 5 }}>
                          John Doe
                        </Text>

                        <Text style={{ fontSize: 8, marginBottom: 4 }}>
                          089721231 | Jl. Blotan Permai No.23 RT 03/40 Jakarta
                          Tmimur
                        </Text>
                      </View>

                      <View style={{ width: "50%" }}>
                        <Text style={{ fontSize: 10, marginBottom: 2 }}>
                          Pengirim
                        </Text>
                        <Text style={{ fontSize: 8, marginBottom: 5 }}>
                          John Kenedy
                        </Text>

                        <Text style={{ fontSize: 8 }}>
                          089721231 | Jl. Blotan Permai No.23 RT 03/40 Jakarta
                          Tmimur
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{ borderBottom: 1.5, borderStyle: "dashed" }}
                  ></View>

                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 10, marginBottom: 2 }}>
                        Produk
                      </Text>
                      <Text style={{ fontSize: 8, marginBottom: 2 }}>
                        1.Label stiker barcode thermal 50x20
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 10, marginBottom: 2 }}>
                        Jumlah
                      </Text>
                      <Text style={{ fontSize: 8, marginBottom: 2 }}>
                        1 Pcs
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      padding: 10,
                      borderTop: 0.5,
                    }}
                  >
                    <Text style={{ fontSize: 8, marginBottom: 2 }}>
                      Catatan :
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                      * Pengirim wajib meminta bukti serah terima paket ke kurir
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                      * Jika paket ini retur, pengirim tetap di kenakan biaya
                      keberangkatan dan biaya retur sesuai ekspedisi
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Page>
      )}
    </Document>
  );
};

export default InvoiceDownload;
