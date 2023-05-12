import {
  Button,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input
} from 'element-ui';

export const installElement = (vue) => {
  vue.prototype.$ELEMENT = { size: 'small'}
  vue.use(Button)
  vue.use(Icon)
  vue.use(Menu)
  vue.use(Submenu)
  vue.use(MenuItem)
  vue.use(MenuItemGroup)
  vue.use(Input)
}
