using System;
using Bff.Services.Interfaces;
using Bff.Dtos.Account;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace Bff.Services
{
    public class AccountService : IAccountService
    {
        private readonly HttpClient _client;

        public AccountService(HttpClient client)
        {
            _client = client;
        }
        public async Task<List<AccountResponse>>GetAll(string token)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.GetAsync($"Account"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<AccountResponse>>(responseStr);
                }

                throw new Exception("Erro interno.");
            }
        }
        public async Task<AccountResponse>GetById(string token, int id)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.GetAsync($"Account/{id}"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<AccountResponse>(responseStr);
                }

                throw new Exception("Erro interno.");
            }
        }

        public async Task<string>Create(string token, RegisterRequest data)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.PostAsync($"Account", content))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    return await httpResponse.Content.ReadAsStringAsync();
                }

                throw new Exception("Erro interno.");
            }
        }

        public async Task<string>Update(string token, int id, UpdateRequest data)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());
            
            using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.PutAsync($"Account/{id}", content))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    return await httpResponse.Content.ReadAsStringAsync();                    
                }
                
                throw new Exception("Erro interno.");
            }
        }

        public async Task<string>Delete(string token, int id)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.DeleteAsync($"Account/{id}"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    return await httpResponse.Content.ReadAsStringAsync();
                }

                throw new Exception("Erro interno.");
            }
        }
    }
}
