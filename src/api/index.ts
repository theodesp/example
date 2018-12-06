import { combineRoutes, EffectFactory } from '@marblejs/core';
import { versionEffect$ } from './common/effects/version.effect';
import { notFoundEffect$ } from './common/effects/notFound.effect';
import { preflightEffect$ } from './common/effects/preflight.effect';
import { getFileEffect$ } from './common/effects/getFile.effect';
import { getDocEffect$ } from './common/effects/getDoc.effect';
import { auth$ } from './auth';
import { users$ } from './users';
import { actors$ } from './actors';
import { movies$ } from './movies';

const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(versionEffect$);

const preflight$ = EffectFactory
  .matchPath('*')
  .matchType('OPTIONS')
  .use(preflightEffect$);

const getDoc$ = EffectFactory
  .matchPath('/doc')
  .matchType('GET')
  .use(getDocEffect$);

const getFile$ = EffectFactory
  .matchPath('/assets/:dir*')
  .matchType('GET')
  .use(getFileEffect$);

const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(notFoundEffect$);

export const api$ = combineRoutes('/api/v1', [
  root$,
  auth$,
  users$,
  actors$,
  movies$,
  getFile$,
  getDoc$,
  preflight$,
  notFound$
]);
