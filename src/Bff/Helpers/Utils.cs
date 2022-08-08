using System.Globalization;

namespace Bff.Helpers
{
    public class Utils
    {
        public static string FormatCpf(string cpf)
        {
            return Convert.ToUInt64(cpf).ToString(@"000\.000\.000\-00");
        }

        public static string FormatCnpj(string cnpj)
        {
            if(!String.IsNullOrEmpty(cnpj)){
                return Convert.ToUInt64(cnpj).ToString(@"00\.000\.000\/0000\-00");
            }

            return cnpj;
        }
        public static string FormatPostalCode(string cep)
        {
            if(!String.IsNullOrEmpty(cep)){
                return Convert.ToUInt64(cep).ToString(@"000\.000\-00");
            }

            return cep;
        }

        public static string CleanStringOnlyNumber(String str)
        {
            if(!String.IsNullOrEmpty(str)){
                return System.Text.RegularExpressions.Regex.Replace(str, "[^a-z0-9_]+", "");
            }

            return str;
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