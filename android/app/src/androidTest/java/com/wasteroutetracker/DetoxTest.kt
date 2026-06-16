package com.wasteroutetracker

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.wix.detox.Detox
import com.wix.detox.config.DetoxConfig
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class DetoxTest {
    @Test
    fun runDetoxTests() {
        val detoxConfig = DetoxConfig()
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 90
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 60
        detoxConfig.rnContextLoadTimeoutSec = if (BuildConfig.DEBUG) 180 else 60

        Detox.runTests(this, detoxConfig)
    }
}
