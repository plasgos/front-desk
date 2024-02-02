import moment from "moment";
import { formatPrice } from "../../../lib/format-price";

const ExportDataExcel = (history) => {
  return [
    {
      columns: [
        {
          title: "No",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wpx: 60 },
        },
        // width in pixels
        {
          title: "Invoice",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 30 },
        }, // width in characters
        {
          title: "Pengirim",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Penerima",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "No. HP",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Alamat Pengirim",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 40 },
        }, // width in pixels
        {
          title: "Kecamatan Pengirim",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "kabupaten Pengirim",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 30 },
        }, // width in characters
        {
          title: "Provinsi Pengirim",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Alamat Penerima",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 40 },
        }, // width in pixels
        {
          title: "Kecamatan Penerima",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Kabupaten Penerima",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Provinsi Penerima",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Isi Paket",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 30 },
        }, // width in pixels
        {
          title: "Catatan",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Nilai Barang",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Qty",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Expedisi",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Service",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "AWB",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "No. Order ",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Type",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "COD",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Biaya COD",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Pencairan COD",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Ongkir",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Diskon Ongkir",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Asuransi",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Admin",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Total Ongkir",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Status",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Tgl. Dibuat",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Tgl. Dikirim",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Tgl. Diterima/Selesai",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Tgl.Retur Selesai",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "TLC",
          style: {
            font: { color: { rgb: "D8D8E0" }, bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "768192" } },
          },
          width: { wch: 20 },
        }, // width in pixels
      ],
      data: history.data.map((data, index) => [
        {
          value: index + 1,
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        { value: data.number, style: { font: { sz: "12" } } },
        { value: data.PackageSender.name, style: { font: { sz: "12" } } },
        {
          value: data.PackageReceiver.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageReceiver.phone_number,
          style: { font: { sz: "12" } },
        },
        { value: data.PackageSender.address, style: { font: { sz: "12" } } },
        {
          value: data.PackageSender.Subdistrict?.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageSender.Subdistrict?.City?.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageSender.Subdistrict?.City?.Province?.name,
          style: { font: { sz: "12" } },
        },

        { value: data.PackageReceiver.address, style: { font: { sz: "12" } } },
        {
          value: data.PackageReceiver.Subdistrict?.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageReceiver.Subdistrict?.City?.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageReceiver.Subdistrict?.City?.Province?.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageItems.map(
            (item) => `-${item.Product.name}, `
          ).join("\n"),
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageDetail.note,
          style: { font: { sz: "12" } },
        },
        {
          value: formatPrice(data.item_value),
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        {
          value: data.PackageItems.map((item) => `${item.quantity}, `).join(
            "\n"
          ),
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageShipping.ServiceType?.Service?.name,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageShipping.ServiceType?.code,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageShipping.awb,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageShipping.number,
          style: { font: { sz: "12" } },
        },
        {
          value: data.PackageShipping.cod ? "COD" : "Non-COD",
          style: { font: { sz: "12" } },
        },
        {
          value: formatPrice(data.PackageShipping.cod_value),
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        {
          value: formatPrice(data.cod_fee),
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        {
          value: "-",
          style: { font: { sz: "12" } },
        },
        {
          value: formatPrice(data.shipping_cost),
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        {
          value: "-",
          style: { font: { sz: "12" } },
        },
        {
          value: formatPrice(data.insurance_fee),
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        {
          value: "-",
          style: { font: { sz: "12" } },
        },
        {
          value: formatPrice(data.shipping_cost),
          style: {
            font: { sz: "12" },
            alignment: { horizontal: "left", vertical: "left" },
          },
        },
        {
          value: data.PackageStatus.name,
          style: { font: { sz: "12" } },
        },
        {
          value: moment(data.PackageStatus.createdAt).format(
            "DD-MM-YYYY HH:mm"
          ),
          style: { font: { sz: "12" } },
        },
      ]),
    },
  ];
};

export default ExportDataExcel;
