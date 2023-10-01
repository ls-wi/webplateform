import { version, unref, inject, hasInjectionContext, getCurrentInstance, useSSRContext, createApp, reactive, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, toRef, h, isReadonly, mergeProps, resolveComponent, withCtx, defineAsyncComponent, isRef, isShallow, isReactive, toRaw } from 'vue';
import { f as useRuntimeConfig$1, m as withQuery, n as hasProtocol, p as parseURL, o as isScriptProtocol, j as joinURL, i as createError$1, $ as $fetch, q as sanitizeStatusCode, r as createHooks, t as isEqual, v as stringifyParsedURL, x as stringifyQuery, y as parseQuery } from '../nitro/node-server.mjs';
import { getActiveHead } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import Flicking from '@egjs/vue3-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$1 = "__unctx__";
const defaultNamespace = _globalThis[globalKey$1] || (_globalThis[globalKey$1] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.7.4";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const parallels = [];
  const errors = [];
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    const promise = applyPlugin(nuxtApp, plugin);
    if (plugin.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig() {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref, lastKey = "") {
  if (ref instanceof Promise)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey] = handler;
}
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
const globalMiddleware = [];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_CaKIoANnI2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      error: []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false)
          ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const router = {
      currentRoute: route,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => window.history.go(-1),
      go: (delta) => window.history.go(delta),
      forward: () => window.history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", {
      functional: true,
      props: {
        to: String,
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    });
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY
];
const _imports_0$6 = "" + __buildAssetsURL("logo.acda6119.jpg");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$h = {
  name: "Header"
};
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "nav" }, _attrs))}><div><img class="logo max-h-36"${ssrRenderAttr("src", _imports_0$6)} alt="logo"></div><ul class="sections"><li class="link"><a href="#">ACCEUIL</a></li><li class="link"><a href="#servweb">SERVICES</a></li><li class="link"><a href="#pres">A PROPOS</a></li><li class="contact"><a href="#contact">CONTACTEZ NOUS</a></li></ul></nav>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Header.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$f]]);
const _sfc_main$g = {
  name: "Presentation"
};
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-lgrey pt-10 md:pt-0" }, _attrs))}><h1 class="font-zilla text-center text-4xl md:mt-10 w-1/2 m-auto bg-yellow">En avant vers la conquête du trésor numérique !</h1><p class="px-6 lg:px-64 text-center text-lg pt-10 pb-20"> Nous sommes Web Treasure, une agence digitale basée à Paris. Notre mission est de vous fournir tous les outils nécessaires pour naviguer vers votre trésor : la réussite de votre projet digital. De la <span class="bg-[#FBB811] text-black px-1">création de sites web au marketing sur les reseaux sociaux</span>, nous mettons tout en oeuvre pour vous apporter une solution sur mesure efficace, quelle que soit l&#39;envergure de votre projet. <br> Web Treasure vous donnera le navire, la carte, les cannons et même la pelle pour naviguer la mer digitale à la recherche du trésor ! </p><div class=""><ul class="grid grid-cols-2 lg:w-4/5 mx-auto bg-lgrey text-center pb-3"><a href="#contact" class="bg-dgrey text-white duration-500 hover:bg-yellow hover:text-black rounded font-zilla my-auto md:mx-32 mx-6 p-3 text-xl border-b-4 border-yellow">Nous contacter</a><a href="#crew" class="bg-dgrey text-white duration-500 hover:bg-yellow hover:text-black rounded font-zilla my-auto md:mx-32 mx-6 p-3 text-xl border-b-4 border-yellow">L&#39;équipage</a></ul></div></div>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Presentation.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Presentation = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$e]]);
const _sfc_main$f = {
  name: "Contact"
};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-3/4 mx-auto bg-[#D8DADE] rounded my-5" }, _attrs))}><div class="md:p-5 p-3 font-zilla"><h3 class="text-5xl border-b-2 border-dgrey pb-3 my-5">Contactez nous ! </h3><h4 class="text-3xl font-sans">Nous sommes à votre disposition</h4><p class="mt-2 font-sans text-lg">Vous souhaitez mettre les voiles vers la réussite de votre projet digital ? Nous avons tout ce qu&#39;il vous faut pour vous y accompagner du début à la fin. N&#39;hésitez pas à nous contacter pour convenir d&#39;un rendez-vous téléphonique ou en présentiel sur Paris. </p><ul class="border-l border-black mt-5 pl-2 font-sans"><li>leith.chakroun@webtreasure.dev</li><li>www.webtreasure.dev</li><li><a href="https://www.linkedin.com/company/web-treasure/">LinkedIn</a></li></ul></div></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Contact.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$d]]);
const _imports_0$5 = "" + __buildAssetsURL("leith.a3382250.png");
const _imports_1$5 = "" + __buildAssetsURL("sakada.5bb7c27d.png");
const _imports_2$2 = "" + __buildAssetsURL("sana.e91bc2f2.png");
const _sfc_main$e = {
  name: "Staff",
  props: {
    name: String,
    prof: String,
    img: String
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:grid md:grid-cols-3" }, _attrs))}><div class="lg:w-1/2 text-center bg-lgrey my-3 rounded m-auto hover:scale-105 duration-1000"><img class="max-h-64 m-auto rounded-full mt-2 p-2"${ssrRenderAttr("src", _imports_0$5)}><div class="font-zilla mt-5"><p class="text-2xl font-bold bg-yellow w-min m-auto p-1">Leith</p><p class="text-lg">Sales Director</p></div></div><div class="lg:w-1/2 text-center bg-lgrey my-3 rounded m-auto hover:scale-105 duration-1000"><img class="max-h-64 m-auto mt-2 p-2 rounded-full"${ssrRenderAttr("src", _imports_1$5)}><div class="font-zilla mt-5"><p class="text-2xl font-bold bg-yellow w-min m-auto p-1">Sakada</p><p class="text-lg">Web Developer</p></div></div><div class="lg:w-1/2 text-center bg-lgrey my-3 rounded m-auto hover:scale-105 duration-1000"><img class="max-h-64 m-auto rounded-full mt-2 p-2"${ssrRenderAttr("src", _imports_2$2)}><div class="font-zilla mt-5"><p class="text-2xl font-bold bg-yellow w-min m-auto p-1">Sana</p><p class="text-lg">Digital Marketing Expert</p></div></div></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/StaffCard.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const StaffCard = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$d = {
  name: "Crew",
  components: {
    StaffCard
  },
  data() {
    return {
      Leith: { name: "Leith", prof: "Sales Manager", img: "../src/barack.jpg" },
      Sakada: { name: "Sakada", prof: "Web Developer", img: "_nuxt/src/barack.jpg" },
      Sana: { name: "Sana", prof: "Digital Marketing Expert", img: "_nuxt/src/barack.jpg" }
    };
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_StaffCard = resolveComponent("StaffCard");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-10 lg:w-3/4 m-auto rounded my-24" }, _attrs))}><h2 class="text-center bg-[#FBB811] w-min m-auto p-1 text-4xl font-zilla">L&#39;équipage</h2><p class="text-center text-xl font-sans mt-5">Une equipe d&#39;experts avec une seule détermination : mener votre projet digital à sa réussite</p><div class="mt-10 p-3 rounded">`);
  _push(ssrRenderComponent(_component_StaffCard, {
    name: $data.Leith.name,
    prof: $data.Leith.prof,
    img: $data.Leith.img
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Crew.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Crew = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$b]]);
const _sfc_main$c = {
  name: "Footer"
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-black text-white text-center" }, _attrs))}><p>©2023 Web Treasure</p></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Footer.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$a]]);
const _imports_0$4 = "" + __buildAssetsURL("ecommerce.05d44569.png");
const _imports_1$4 = "" + __buildAssetsURL("design123.c80a640f.jpg");
const _sfc_main$b = {
  name: "SiteType",
  props: {
    title: String
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ml-10 rounded" }, _attrs))}><div class="grid md:grid-cols-2 lg:max-w-5xl md:max-w-2xl max-w-xs"><div class=""><div class=""><h4 class="md:text-3xl text-2xl text-white bg-dgrey border-b-4 border-yellow p-5 text-center md:text-left">Créez un site de <span class="bg-yellow text-black px-1">e-commerce</span> pour vendre et promouvoir vos produits en ligne et développer <span class="bg-yellow text-black px-1">votre chiffre d&#39;affaires</span> ! </h4></div><p class="p-5 md:text-xl text-lg md:mt-10 md:mr-16 text-justify md:text-left"> Web Treasure vous accompagnera dans votre projet de création de site de e-commerce quels que soient vos produits ou services. Notre équipe expérimentée crée des plateformes esthétiques, conviviales et sécurisées, adaptées à vos besoins. Faites confiance à Web Treasure pour donner vie à votre présence en ligne et transformer votre entreprise en succès commercial. </p></div><img${ssrRenderAttr("src", _imports_0$4)} class="w-36 md:absolute self-center justify-self-center"><img${ssrRenderAttr("src", _imports_1$4)} class="hidden md:block self-center"></div></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SiteType.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const SiteType = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$9]]);
const _imports_0$3 = "" + __buildAssetsURL("site-vitrine.25b42b4a.png");
const _imports_1$3 = "" + __buildAssetsURL("food_delivery.fbb8906a.jpg");
const _sfc_main$a = {
  name: "SiteVitrine",
  props: {
    title: String
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ml-10 rounded" }, _attrs))}><div class="grid md:grid-cols-2 lg:max-w-5xl md:max-w-2xl max-w-xs"><div class=""><h4 class="md:text-3xl text-2xl text-white bg-dgrey border-b-4 border-yellow p-5 text-center md:text-left">Créez un <span class="bg-yellow text-black px-1">site vitrine</span> pour donner une image et une <span class="bg-yellow text-black px-1">visibilité</span> à votre entreprise ! </h4><p class="p-5 md:text-xl text-lg md:mt-10 md:mr-16 text-justify md:text-left"> Web Treasure est votre partenaire pour la création de votre site vitrine. Nous vous accompagnons tout au long du processus, de la création des contenus à la mise en page, afin de vous démarquer dans votre secteur d&#39;activités. Faites-nous confiance pour façonner une image digitale qui vous met en valeur et attire l&#39;attention. Avec notre expertise et notre engagement, nous vous aiderons à créer une présence en ligne remarquable qui vous démarquera de vos concurrents. </p></div><img${ssrRenderAttr("src", _imports_0$3)} class="w-36 md:absolute self-center justify-self-center"><img${ssrRenderAttr("src", _imports_1$3)} class="self-center hidden md:block"></div></div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SiteVitrine.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const SiteVitrine = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$8]]);
const _imports_0$2 = "" + __buildAssetsURL("maintenance.1e578795.png");
const _imports_1$2 = "" + __buildAssetsURL("maisouicclair.b1b76b09.jpg");
const _sfc_main$9 = {
  name: "SiteRefonte",
  props: {
    title: String
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ml-10 rounded" }, _attrs))}><div class="grid md:grid-cols-2 lg:max-w-5xl md:max-w-2xl max-w-xs"><div class=""><div class=""><h4 class="md:text-3xl text-2xl text-white bg-dgrey border-b-4 border-yellow p-5 text-center md:text-left"><span class="bg-yellow text-black px-1">Améliorez</span> votre site web pour exploiter pleinement son <span class="bg-yellow text-black px-1">potentiel</span> et renouveller votre entreprise ! </h4></div><p class="p-5 md:text-xl text-lg md:mt-10 md:mr-16 text-justify md:text-left"> Web Treasure vous accompagne vers la modernisation de votre site web. Votre site est l&#39;outil qui vous permet d&#39;interagir avec le reste du monde, il est donc nécessaire de le renouveller au fil des années. Restez au gout du jour avec Web Treasure, nous vous garantissons un référencement performant et un design unique et morderne. Le potentiel de votre entreprise ne peut plus être inhibé par votre site ! </p></div><img${ssrRenderAttr("src", _imports_0$2)} class="w-36 md:absolute self-center justify-self-center"><img${ssrRenderAttr("src", _imports_1$2)} class="self-center hidden md:block"></div></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SiteRefonte.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const SiteRefonte = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$8 = {
  name: "Slider",
  components: {
    Flicking,
    SiteType,
    SiteVitrine,
    SiteRefonte
  },
  data() {
    return {
      plugins: [new Pagination({ type: "bullet" })]
    };
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Flicking = resolveComponent("Flicking");
  const _component_SiteVitrine = resolveComponent("SiteVitrine");
  const _component_SiteRefonte = resolveComponent("SiteRefonte");
  const _component_SiteType = resolveComponent("SiteType");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-10" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Flicking, {
    options: { circular: true },
    plugins: $data.plugins
  }, {
    viewport: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flicking-pagination"${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", { class: "flicking-pagination" })
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_SiteVitrine, { class: "mb-16 border-dgrey border-2" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SiteRefonte, { class: "mb-16 border-dgrey border-2" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SiteType, { class: "mb-16 border-dgrey border-2" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_SiteVitrine, { class: "mb-16 border-dgrey border-2" }),
          createVNode(_component_SiteRefonte, { class: "mb-16 border-dgrey border-2" }),
          createVNode(_component_SiteType, { class: "mb-16 border-dgrey border-2" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Slider.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Slider = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$6]]);
const _imports_0$1 = "" + __buildAssetsURL("STEP-FULL.d50f2dd5.png");
const _imports_1$1 = "" + __buildAssetsURL("WAy.611d1355.png");
const _imports_2$1 = "" + __buildAssetsURL("STEP-ONLY.2f8d528f.png");
const _sfc_main$7 = {
  name: "ServicesWeb",
  components: { Slider }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Slider = resolveComponent("Slider");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-10 m-auto my-10 font-zilla" }, _attrs))}><h2 class="text-center bg-yellow w-min m-auto p-1 text-4xl mb-10">Développement Web</h2><div class=""><div class="bg-lgrey rounded px-10"><div class="md:w-3/4 m-auto"><h3 class="categorie">Création de Sites Web</h3><p class="text-lg text-center p-5 font-sans">Avec notre équipe expérimentée de développeurs et de designers, nous créons des <span class="bg-yellow p-1">sites web professionnels, attractifs et adaptés à vos objectifs commerciaux</span>. Chaque entreprise est unique, c&#39;est pourquoi nous offrons des solutions sur mesure pour répondre à vos besoins spécifiques. Faites confiance à Web Treasure pour créer un site web efficace qui vous permettra de <span class="bg-yellow p-1">développer votre activité en ligne</span>. Contactez-nous dès maintenant pour en savoir plus sur nos services et pour discuter de votre projet.</p></div></div><div class="mt-5 bg-white rounded px-10"><div class="md:w-3/4 m-auto"><h3 class="categorie">Les étapes</h3><div class="m-auto"><img${ssrRenderAttr("src", _imports_0$1)} alt="" class="lg:block hidden"><img${ssrRenderAttr("src", _imports_1$1)} alt="" class="lg:hidden block"><img${ssrRenderAttr("src", _imports_2$1)} alt="" class="lg:hidden block"></div></div></div><div class="mt-5 bg-lgrey rounded px-10"><div class="m-auto"><h3 class="categorie md:w-3/4 m-auto">Les types de sites</h3>`);
  _push(ssrRenderComponent(_component_Slider, null, null, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ServicesWeb.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ServicesWeb = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$6 = {
  name: "ServiceCard",
  props: {
    title: String,
    text: String
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1" }, _attrs))}><button class="group serviceContainer"><h4 class="serviceTitre border-b-4 border-yellow p-1">${ssrInterpolate($props.title)}</h4><p class="serviceTexte group-hover:block lg:mx-10 font-sans">${ssrInterpolate($props.text)}</p></button></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ServiceCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ServiceCard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$4]]);
const _imports_0 = "" + __buildAssetsURL("crea.1b20e5ec.png");
const _imports_1 = "" + __buildAssetsURL("pull_jaune.d8b67859.jpg");
const _imports_2 = "" + __buildAssetsURL("marketing.866abf8d.png");
const _imports_3 = "" + __buildAssetsURL("group.add810e5.jpg");
const _sfc_main$5 = {
  name: "ServicesMarketing",
  components: {
    ServiceCard
  },
  data() {
    return {
      Seo: { title: "SEO et Réferencement Naturel", text: "Le SEO et le référencement naturel sont clés pour être visible sur les moteurs de recherche. En travaillant avec nous, vous pouvez être sûr que nous mettons en place une stratégie de référencement naturel efficace qui vous permettra d'atteindre vos objectifs de visibilité et de génération de leads. " },
      Bench: { title: "Benchmarking et Analyse Concurrentielle", text: "Le benchmarking et l'analyse concurrentielle sont essentiels pour comprendre comment se positionne votre entreprise sur le marché et pour déterminer les actions à mettre en place pour améliorer votre performance. Nous travaillons avec vous pour déterminer vos points forts et vos points à améliorer." },
      Crea: { title: "Gestion et Création de contenu", text: "Notre agence de marketing digital est experte en création et gestion de contenu. Nous vous accompagnons pour développer une stratégie de contenu efficace et engageante, qui vous permettra de captiver votre audience et de vous démarquer de vos concurrents." },
      Id: { title: "Création d'Identité Visuelle", text: "Nous sommes passionnés par l'aide que nous apportons aux entreprises pour développer leur image de marque. Nous travaillons avec vous pour créer une identité visuelle cohérente et impactante qui reflète votre entreprise de manière professionnelle et attrayante. " }
    };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ServiceCard = resolveComponent("ServiceCard");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-auto font-zilla bg-lgrey mt-10 rounded p-10" }, _attrs))}><h2 class="text-center bg-yellow md:w-2/6 m-auto p-1 text-4xl font-zilla mb-4">Nos services Marketing Digital</h2><div class="md:w-3/4 m-auto"><div class=""><img${ssrRenderAttr("src", _imports_0)} class="w-24 md:w-36 float-right"><h3 class="categorie md:w-10/12 w-2/3">Design</h3><img${ssrRenderAttr("src", _imports_1)} class="lg:float-left lg:w-2/5 lg:mr-5 mt-5 rounded">`);
  _push(ssrRenderComponent(_component_ServiceCard, {
    title: $data.Crea.title,
    text: $data.Crea.text
  }, null, _parent));
  _push(ssrRenderComponent(_component_ServiceCard, {
    title: $data.Id.title,
    text: $data.Id.text
  }, null, _parent));
  _push(`</div><div class=""><img${ssrRenderAttr("src", _imports_2)} class="w-24 md:w-36 float-right"><h3 class="categorie md:w-10/12 w-2/3">Stratégie</h3><img${ssrRenderAttr("src", _imports_3)} class="lg:float-right lg:w-2/5 lg:ml-5 mt-5 rounded">`);
  _push(ssrRenderComponent(_component_ServiceCard, {
    title: $data.Seo.title,
    text: $data.Seo.text
  }, null, _parent));
  _push(ssrRenderComponent(_component_ServiceCard, {
    title: $data.Bench.title,
    text: $data.Bench.text
  }, null, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ServicesMarketing.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ServicesMarketing = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$4 = {
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      typeValue: "",
      typeStatus: false,
      typeArray: [],
      typingSpeed: 100,
      erasingSpeed: 50,
      newTextDelay: 2e3,
      typeArrayIndex: 0,
      charIndex: 0
    };
  },
  methods: {
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus)
          this.typeStatus = true;
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus)
          this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex - 1);
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1e3);
      }
    }
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
    this.typeArray = this.words;
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}> {<span class="typed-text font-zilla">${ssrInterpolate(_ctx.typeValue)}</span>} </div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/TypingEffect.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TypeEffect = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {
  name: "Banner",
  data() {
    return {
      words: ["Développement Web", "Marketing", "Stratégie Digitale", "Mettons les voiles !"]
    };
  },
  components: {
    TypeEffect
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TypeEffect = resolveComponent("TypeEffect");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner border-b-4 border-yellow" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_TypeEffect, {
    class: "bannerText",
    words: $data.words
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Banner.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Banner = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = {
  name: "App",
  components: {
    Header,
    Presentation,
    Contact,
    Crew,
    Footer,
    ServicesMarketing,
    ServicesWeb,
    Banner
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = resolveComponent("Header");
  const _component_Banner = resolveComponent("Banner");
  const _component_Presentation = resolveComponent("Presentation");
  const _component_ServicesWeb = resolveComponent("ServicesWeb");
  const _component_ServicesMarketing = resolveComponent("ServicesMarketing");
  const _component_Crew = resolveComponent("Crew");
  const _component_Contact = resolveComponent("Contact");
  const _component_Footer = resolveComponent("Footer");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="lg:grid lg:grid-cols-1">`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(ssrRenderComponent(_component_Banner, null, null, _parent));
  _push(ssrRenderComponent(_component_Presentation, { id: "pres" }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ServicesWeb, { id: "servweb" }, null, _parent));
  _push(ssrRenderComponent(_component_ServicesMarketing, null, null, _parent));
  _push(ssrRenderComponent(_component_Crew, { id: "crew" }, null, _parent));
  _push(ssrRenderComponent(_component_Contact, { id: "contact" }, null, _parent));
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    (_error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-404-9b60c7e4.mjs').then((r) => r.default || r));
    const _Error = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-500-649ed79d.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-67a9f2d4.mjs').then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, createError as c, entry$1 as default, injectHead as i, navigateTo as n, resolveUnrefHeadInput as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
