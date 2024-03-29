using System;
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
                
                throw new Exception("Erro interno.");
            }
        }

        public async Task<List<UsersResponse>>GetAll(string token)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var httpResponse = await _client.GetAsync($"Users"))
            {
                if (httpResponse.IsSuccessStatusCode)
                {
                    var responseStr = await httpResponse.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<UsersResponse>>(responseStr);
                }

                throw new Exception("Erro interno.");
            }
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

        public async Task<string>Create(string token, RegisterRequest data)
        {
            var encodeToken = token.Split(" ");
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(encodeToken.FirstOrDefault(), encodeToken.LastOrDefault());

            using (var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"))
            using (var httpResponse = await _client.PostAsync($"Users", content))
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
            using (var httpResponse = await _client.PutAsync($"Users/{id}", content))
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

            using (var httpResponse = await _client.DeleteAsync($"Users/{id}"))
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
