/* uni.navigateTo 的 options 类型 */
export interface INavigationToOptions extends UniNamespace.NavigateToOptions {
  auth?: boolean;
}

/* uni.reLaunch 的 options 类型 */
export interface IReLaunchOptions extends UniNamespace.ReLaunchOptions {
  auth?: boolean;
}

/* uni.redirectTo 的 options 类型 */
export interface IRedirectToOptions extends UniNamespace.RedirectToOptions {
  auth?: boolean;
}
