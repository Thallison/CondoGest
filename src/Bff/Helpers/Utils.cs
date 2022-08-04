using System.Globalization;

namespace Bff.Helpers
{
    public class Utils
    {
        public static string FormatCpf(string cpf)
        {
            return Convert.ToUInt64(cpf).ToString(@"000\.000\.000\-00");
        }

        public static string FormatCNPJ(string CNPJ)
        {
            return Convert.ToUInt64(CNPJ).ToString(@"00\.000\.000\/0000\-00");
        }
        public static string FormatPostalCode(string CNPJ)
        {
            return Convert.ToUInt64(CNPJ).ToString(@"000\.000\-00");
        }

        public static string CleanStringOnlyNumber(String cpf)
        {
            return System.Text.RegularExpressions.Regex.Replace(cpf, "[^a-z0-9_]+", "");
        }

        public static string FormatPrice(string price)
        {
            NumberFormatInfo nfi = CultureInfo.CreateSpecificCulture("pt-BR").NumberFormat;
            var d = Convert.ToDecimal(price)/100;
            return d.ToString("N2", nfi);
        }

        public static string CleanPrice(string price)
        {
            NumberFormatInfo nfi = CultureInfo.CreateSpecificCulture("en-US").NumberFormat;
            var d = Convert.ToDecimal(price);
            return d.ToString("F2", nfi);
        }

    }
}