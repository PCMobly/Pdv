#include <napi.h>
#include <string.h>
#include <iostream>

#ifdef _WIN32
    #include <windows.h>
#endif

using Napi::Boolean;
using Napi::CallbackInfo;
using Napi::Env;
using Napi::Error;
using Napi::Function;
using Napi::Number;
using Napi::Object;
using Napi::String;
using Napi::TypeError;
using Napi::Value;

using std::string;


#ifndef NODESITEF_H // include guard
#define NODESITEF_H 1

typedef const char* (*ImpComprovante)(string);
typedef const char* (*ImpComprovanteEncerramento)(int);
typedef const char* (*ConsultarSat)(string);
typedef const char* (*VendaSat)(string);
typedef const char* (*IniciarTef)(string);
typedef const char* (*MenuTef)(string);
typedef const char* (*VendaTef)(string);
typedef const char* (*CancelarPagtoTef)(string);
typedef const char* (*CapturaCpf)(string);
typedef int (*SomaTotalDll)(int, int);

Value carregarDLL(const CallbackInfo &info);

namespace functionexample {
  const char* impComprovante(string jsonDados);
  Value impComprovanteWrapped(const CallbackInfo &info);

  const char* impComprovanteEncerramento(int idTurno);
  Value impComprovanteEncerramentoWrapped(const CallbackInfo &info);

  const char* consultarSat(string jsonDados);
  Value consultaSatWrapped(const CallbackInfo &info);

  const char* vendaSat(string jsonVenda);
  Value vendaSatWrapped(const CallbackInfo &info);

  const char* vendaTef(string jsonVenda);
  Value vendaTefWrapped(const CallbackInfo &info);

  const char* iniciarTef(string jsonVenda);
  Value iniciarTefWrapped(const CallbackInfo &info);

  const char* menuTef(string jsonVenda);
  Value menuTefWrapped(const CallbackInfo &info);

  const char* cancelarPagtoTef(string jsonVenda);
  Value cancelarPagtoTefWrapped(const CallbackInfo &info);

  int somaTotal(int valor1, int valor2);
  Number somaTotalWrapped(const CallbackInfo &info);

  const char* capturaCpf(string jsonDados);
  Value capturaCpfWrapped(const CallbackInfo &info);
}


#endif /* NODESITEF_H */