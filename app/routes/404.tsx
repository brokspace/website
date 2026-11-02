// The not-found page at /404, answered with 200 so it can be prerendered:
// static hosting serves it for every missing path (ErrorDocument in
// public/.htaccess).
export { default, meta } from './not-found';

export function loader() {
  return null;
}
