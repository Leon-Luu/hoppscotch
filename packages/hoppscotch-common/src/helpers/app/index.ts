import { platform } from "~/platform"

let initialized = false

export function initializeApp() {
  if (!initialized) {
    try {
      platform.auth.performAuthInit()
      platform.sync.settings.initSettingsSync()
      // initCollectionsSync may return a promise; catch rejections to
      // avoid unhandled promise errors in this legacy sync code path.
      Promise.resolve(platform.sync.collections.initCollectionsSync()).catch(
        (err) => console.error("Failed to initialize collections sync:", err)
      )
      platform.sync.history.initHistorySync()
      platform.sync.environments.initEnvironmentsSync()
      platform.analytics?.initAnalytics()

      initialized = true
    } catch (_e) {
      // initializeApp throws exception if we reinitialize
      initialized = true
    }
  }
}
