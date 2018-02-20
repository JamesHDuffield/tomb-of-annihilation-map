# TombOfAnnihilation [![Build Status](https://travis-ci.org/JamesHDuffield/tomb-of-annihilation-map.svg?branch=master)](https://travis-ci.org/JamesHDuffield/tomb-of-annihilation-map)

This project is designed to assist Dungeon Masters with travel during a Tomb of Annihilation campaign.

Check out https://tomb-of-annihilation-map.firebaseapp.com/ for a preview.

## Development server

Run `npm install` then `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Build is automated with travis-ci. Run `npm run build` to build to local dist folder or `npm run deploy` to deploy. This requires you to run `npm i firebase -g && firebase login` first.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
