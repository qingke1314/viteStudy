import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';

function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}
function getSideEffects4(partialName, options) {
  const { importStyle = "css" } = options;
  if (!importStyle)
    return;               
  if (importStyle === "sass") {
    return [
      "~theme/base.scss",
      `~theme/${partialName}.scss`
    ];
  } else {
    return [
      "~theme/base.css",
      `~theme/${partialName}.css`
    ];
  }
}
function myElementResolver (options = {}) {
  return {
    type: "component",
    resolve: (name) => {
      if (options.exclude && name.match(options.exclude))
        return;
      if (/^El[A-Z]/.test(name)) {
        const compName = name.slice(2);
        const partialName = kebabCase(compName);
        if (partialName === "collapse-transition") {
          return {
            from: `element-ui/lib/transitions/${partialName}`
          };
        }
        return {
          from: `element-ui/lib/${partialName}`,
          sideEffects: getSideEffects4(partialName, options)
        };
      }
    }
  };
};
export default defineConfig({
  plugins: [
		vue2(),
		Components({
			resolvers: [myElementResolver()],
		}),
	],
  resolve: {
    alias: {
      '@': '/src',
      '~theme': '/theme'
    }
  },
  optimizeDeps: {
    include: []
  }
});