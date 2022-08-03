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
            return string.Format("{0:N}", price);
        }

        public static string cleanPrice(string price)
        {
            return string.Format("{0:000.0}", price);
        }

    }
}