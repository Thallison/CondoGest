using Bff.Middlewares;
using Bff.Helpers;
using System.Text.Json.Serialization;
using Bff.Services.Interfaces;
using Bff.Services;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

string userApi = builder.Configuration.GetSection("UsersApi").Value;
string condominiumApi = builder.Configuration.GetSection("CondominiumApi").Value;

// Add services to the container.
services.AddHttpClient<IUserService, UserService>(client =>
{
    client.BaseAddress = new Uri(userApi);
    client.Timeout = TimeSpan.FromMinutes(5);
}).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }
});

services.AddHttpClient<ICondominiumService, CondominiumService>(client =>
{
    client.BaseAddress = new Uri(condominiumApi);
    client.Timeout = TimeSpan.FromMinutes(5);
}).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }
});

services.AddControllers();
services.AddCors();
services.AddControllers().AddJsonOptions(x =>
{
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

    // ignore omitted parameters on models to enable optional params (e.g. User update)
    //x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

var app = builder.Build();

{
    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();

    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
