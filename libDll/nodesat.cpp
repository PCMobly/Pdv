#include "nodesat.hpp"

#ifdef _WIN32
HMODULE handler;
#endif


Value carregarDLL(const CallbackInfo &info)
{
  Env env = info.Env();

  if (handler)
    return Boolean::New(env, true);

  if (info.Length() < 1)
    napi_throw_error(env, "0", "Informe o caminho da DLL.");
  else if (!info[0].IsString())
    napi_throw_type_error(env, "1", "O caminho informado nao e uma string valida.");
  else
  {
    
    string path = info[0].ToString().Utf8Value();
    #ifdef _WIN32
    handler = LoadLibrary(path.c_str());
    #endif

    if (!handler)
      napi_throw_type_error(env, "2", "Nao foi possivel carregar a Dll.");
    else
      return Boolean::New(env, true);
  }

  return env.Null();
}


const char* functionexample::consultarSat(string jsonDados)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  ConsultarSat consultar = (ConsultarSat)GetProcAddress(handler,"ConsultarSat");

  return consultar(jsonDados);
}



Value functionexample::consultaSatWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::consultarSat(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::capturaCpf(string jsonDados)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  CapturaCpf captura = (CapturaCpf)GetProcAddress(handler,"CapturaCPF"); 

  return captura(jsonDados);
}

Value functionexample::capturaCpfWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::capturaCpf(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::impComprovante(string jsonDados)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  ImpComprovante impComp = (ImpComprovante)GetProcAddress(handler,"ImpComprovante");

  printf("Json eh: %s", jsonDados.c_str());

  return impComp(jsonDados);
}

Value functionexample::impComprovanteWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::impComprovante(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::impComprovanteEncerramento(int idTurno)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  ImpComprovanteEncerramento impComp = (ImpComprovanteEncerramento)GetProcAddress(handler,"ImpComprovanteEncerramento");

  printf("O id do turno eh: %d", idTurno);

  return impComp(idTurno);
}

Value functionexample::impComprovanteEncerramentoWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::impComprovanteEncerramento(info[0].As<Napi::Number>().Int32Value()));
}

const char* functionexample::vendaSat(string jsonVenda)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  VendaSat vender = (VendaSat)GetProcAddress(handler,"VendaSat");

  return vender(jsonVenda);
}

Value functionexample::vendaSatWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::vendaSat(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::vendaTef(string jsonVenda)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  VendaTef vendaTef = (VendaTef)GetProcAddress(handler,"VendaTef");

  return vendaTef(jsonVenda);
}

Value functionexample::vendaTefWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::vendaTef(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::iniciarTef(string jsonVenda)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  IniciarTef iniciar = (IniciarTef)GetProcAddress(handler,"IniciarTef");

  return iniciar(jsonVenda);
}

Value functionexample::iniciarTefWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::iniciarTef(info[0].As<Napi::String>().Utf8Value()));
}

Value functionexample::menuTefWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::menuTef(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::menuTef(string jsonVenda)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  MenuTef menu = (MenuTef)GetProcAddress(handler,"MenuTef");

  return menu(jsonVenda);
}


Value functionexample::cancelarPagtoTefWrapped(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, functionexample::cancelarPagtoTef(info[0].As<Napi::String>().Utf8Value()));
}

const char* functionexample::cancelarPagtoTef(string jsonVenda)
{
  if (!handler)
    throw("Carregue a DLL libMobly!");

  CancelarPagtoTef cancelar = (CancelarPagtoTef)GetProcAddress(handler,"CancelarPagtoTef");

  return cancelar(jsonVenda);
}

int functionexample::somaTotal(int valor1, int valor2)
{
  if (!handler)
    throw("Carregue a DLL libMobly!"); 

  SomaTotalDll somaDll = (SomaTotalDll)GetProcAddress(handler, "SomaTotal");

  return somaDll(valor1,valor2);
}

Number functionexample::somaTotalWrapped(const CallbackInfo& info) {
  Env env = info.Env();
  Number returnValue = Number::New(env, functionexample::somaTotal(info[0].As<Napi::Number>().Int32Value(),info[1].As<Napi::Number>().Int32Value()));
  return returnValue;
}

Object Init(Env env, Object exports)
{
  exports.Set(
      String::New(env, "carregarDLL"),
      Function::New(env, carregarDLL));

  exports.Set("consultarSat", Function::New(env, functionexample::consultaSatWrapped));
  exports.Set("somaTotal", Function::New(env, functionexample::somaTotalWrapped));
  exports.Set("vendaSat", Function::New(env, functionexample::vendaSatWrapped));
  exports.Set("impComprovante", Function::New(env, functionexample::impComprovanteWrapped));
  exports.Set("impComprovanteEncerramento", Function::New(env, functionexample::impComprovanteEncerramentoWrapped));
  exports.Set("capturaCpf", Function::New(env, functionexample::capturaCpfWrapped));
  exports.Set("vendaTef", Function::New(env, functionexample::vendaTefWrapped));
  exports.Set("iniciarTef", Function::New(env, functionexample::iniciarTefWrapped));
  exports.Set("menuTef", Function::New(env, functionexample::menuTefWrapped));
  exports.Set("cancelarPagtoTef", Function::New(env, functionexample::cancelarPagtoTefWrapped));
  return exports;
}

NODE_API_MODULE(nodesat, Init);