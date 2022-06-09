/* eslint-disable */
function ErrorNotFound() {
  return import(
    /* webpackChunkName: "ErrorNotFound" */ "pages/ErrorNotFound.vue"
  );
}
function Home() {
  return import(/* webpackChunkName: "Home" */ "pages/Home.vue");
}
function Test() {
  return import(/* webpackChunkName: "Test" */ "pages/Test.vue");
}

export default [
  {
    name: "ErrorNotFound",
    path: "ErrorNotFound",
    component: ErrorNotFound,
  },
  {
    name: "Home",
    path: "Home",
    component: Home,
  },
  {
    name: "Test",
    path: "Test",
    component: Test,
  },
];
