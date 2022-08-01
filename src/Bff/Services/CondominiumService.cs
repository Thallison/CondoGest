using System;
using Bff.Services.Interfaces;
using Bff.Dtos.Condominium;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace Bff.Services
{
    public class CondominiumService : ICondominiumService
    {
        private readonly HttpClient _client;

        public CondominiumService(HttpClient client)
        {
            _client = client;
        }
        public async Task<List<CondominiumResponse>>GetAll(string token)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.GetAsync($"Condominium"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<CondominiumResponse>>(responseStr);
                }

                throw new Exception("Erro interno.");
            }
        }
        public async Task<CondominiumResponse>GetById(string token, int id)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.GetAsync($"Condominium/{id}"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<CondominiumResponse>(responseStr);
                }

                throw new Exception("Erro interno.");
            }
        }

        public async Task<string>Create(string token, RegisterRequest data)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.PostAsync($"Condominium", content))
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
            using (var httpResponse = await _client.PutAsync($"Condominium/{id}", content))
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

            using (var httpResponse = await _client.DeleteAsync($"Condominium/{id}"))
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
