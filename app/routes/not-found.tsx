import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { DefaultNotFound } from 'fumadocs-ui/layouts/home/not-found';
import { data } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';
import { useLang } from '@/lib/use-lang';
import type { Route } from './+types/not-found';

export function loader() {
  return data(null, { status: 404 });
}

export function meta(_: Route.MetaArgs) {
  return [{ title: 'Not found | Brokspace' }];
}

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions(useLang())}>
      <DefaultNotFound />
    </HomeLayout>
  );
}
