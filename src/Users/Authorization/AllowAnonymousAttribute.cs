namespace Users.Authorization
{
    /*Permissão anônima personalizada (em vez de usar a incorporada) para consistência e para evitar erros de referência ambíguos entre namespaces*/
    [AttributeUsage(AttributeTargets.Method)]
    public class AllowAnonymousAttribute : Attribute
    {
    }
}
