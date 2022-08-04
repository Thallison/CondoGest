using System.Globalization;

namespace Bff.Helpers
{
    public class Utils
    {
        public static string formatCpf(string cpf)
        {
            return Convert.ToUInt64(cpf).ToString(@"000\.000\.000\-00");
        }

        public static string cleanCpf(String cpf)
        {
            return System.Text.RegularExpressions.Regex.Replace(cpf, "[^a-z0-9_]+", "");
        }

        public static string formatPrice(string price)
        {
            NumberFormatInfo nfi = CultureInfo.CreateSpecificCulture("pt-BR").NumberFormat;
            var d = Convert.ToDecimal(price)/100;
            return d.ToString("N2", nfi);
        }

        public static string cleanPrice(string price)
        {
            NumberFormatInfo nfi = CultureInfo.CreateSpecificCulture("en-US").NumberFormat;
            var d = Convert.ToDecimal(price);
            return d.ToString("F2", nfi);
        }

    }
}