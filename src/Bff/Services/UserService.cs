using Bff.Services.Interfaces;
using Bff.Dtos.Authenticate;
using Bff.Dtos.Users;
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
        }

        public async Task<List<UsersResponse>>GetAll(string token)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            //using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.GetAsync($"Users"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<UsersResponse>>(responseStr);
                }
                return null;
            }
        }
        public async Task<UsersResponse>GetById(string token, int id)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            //using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.GetAsync($"Users/{id}"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<UsersResponse>(responseStr);
                }
                return null;
            }
        }
    }
}
