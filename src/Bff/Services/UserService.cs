using Bff.Services.Interfaces;
using Bff.Dtos.Authenticate;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace Bff.Services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _client;

        public UserService(HttpClient client)
        {
            _client = client;
        }
        public async Task<LoginResponse>Login(LoginRequest data)
        {
            using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.PostAsync($"Users/login", content))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<LoginResponse>(responseStr);
                }
                return null;
            }
            /*string baseURL = "http://localhost:49160/";
            string url = baseURL + "Users/login";

            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage responseMessage = await client.GetAsync(url))
                {
                    using (HttpContent content = responseMessage.Content)
                    {
                        string data = await content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<List<LoginResponse>>(data);
                    }
                }
            }
            */
            return new LoginResponse();
        }
    }
}
