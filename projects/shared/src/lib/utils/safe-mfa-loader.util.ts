import {loadRemoteModule} from '@angular-architects/native-federation';

export async function safeMfaLoader(remoteName: string, modulePath: string) {
  try {
    return await loadRemoteModule(remoteName, modulePath);
  } catch (err) {
    console.error(`[MF] Remote "${remoteName}" failed to load:`, err);

    return {
      routes: [
        {
          path: '',
          loadComponent: () =>
            import('../ui/fallback/fallback').then(m => m.Fallback),
        },
      ],
    };
  }
}
