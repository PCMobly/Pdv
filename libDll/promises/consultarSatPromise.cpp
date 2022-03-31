#include <napi.h>
#include "../nodesat.hpp"

class ConsultarStatusSatPromise : public PromiseWorker<const char*>
{
public:
  static Value Create(const CallbackInfo &info)
  {
    int numSessao = info[0].As<Napi::Number>().Int32Value();
    ConsultarStatusSatPromise *worker = new ConsultarStatusSatPromise(info.Env(), numSessao);
    worker->Queue();
    return worker->deferredPromise.Promise();
  }

protected:
  void Execute() override
  {
    result = consultarSat(numSessao);
  }

  virtual void OnOK() override
  {
    Object obj = Object::New(Env());
    obj.Set("retorno", result);

    deferredPromise.Resolve(obj);
  }

private:
  ConsultarStatusSatPromise(napi_env env, int p_numSessao) : PromiseWorker(env), numSessao(p_numSessao) {}

  int numSessao;
};
