using System;
using Accounts.Services.Interfaces;
using Accounts.Dtos.Users;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace Accounts.Services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _client;

        public UserService(HttpClient client)
        {
            _client = client;
        }

        public async Task<UsersResponse>GetById(string token, int id)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.GetAsync($"Users/{id}"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<UsersResponse>(responseStr);
                }

                throw new Exception("Erro interno.");
            }
        }
    }
}
