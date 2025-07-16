export function removeLastSlash(pathname: string): string {
  /**
   * Remove last slash
   * [1]
   * @input  = '/dashboard/calendar/'
   * @output = '/dashboard/calendar'
   * [2]
   * @input  = '/dashboard/calendar'
   * @output = '/dashboard/calendar'
   */
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
