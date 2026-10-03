'use client'

import { useEffect, useState } from 'react'
import { Button, Heading, IconButton, Label, Stack, Text } from '@primer/react'
import { GearIcon, GiftIcon, GraphIcon, HomeIcon, PeopleIcon, PlusIcon, ShieldCheckIcon, TrophyIcon, ZapIcon } from '@primer/octicons-react'

const navItems = [
  { label: 'Mine', icon: HomeIcon, active: true },
  { label: 'Boosts', icon: ZapIcon },
  { label: 'Friends', icon: PeopleIcon },
  { label: 'Rewards', icon: GiftIcon },
  { label: 'Stats', icon: GraphIcon },
]

export default function Page() {
  const [count, setCount] = useState(0)
  const [isMining, setIsMining] = useState(false)

  useEffect(() => {
    const telegram = (window as Window & { Telegram?: { WebApp?: { ready: () => void; expand: () => void } } }).Telegram?.WebApp
    telegram?.ready()
    telegram?.expand()
  }, [])

  function tap() {
    setCount((current) => current + 100)
    setIsMining(true)
    window.setTimeout(() => setIsMining(false), 180)
    const telegram = (window as Window & { Telegram?: { WebApp?: { HapticFeedback?: { impactOccurred: (style: string) => void } } } }).Telegram?.WebApp
    telegram?.HapticFeedback?.impactOccurred('medium')
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bgColor-default)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 32px' }}>
        <Stack direction="vertical" gap="spacious">
          <header>
            <Stack direction="horizontal" align="center" justify="space-between">
              <Stack direction="horizontal" gap="condensed" align="center">
                <span style={{ color: 'var(--attention-fgColor)' }}><ShieldCheckIcon size={28} /></span>
                <Stack direction="vertical" gap="none">
                  <Heading as="h1" variant="large">ARM Token</Heading>
                  <Text style={{ color: 'var(--fgColor-muted)', fontSize: 12 }}>MINING NETWORK</Text>
                </Stack>
              </Stack>
              <IconButton icon={GearIcon} aria-label="Open settings" variant="invisible" />
            </Stack>
          </header>

          <section style={{ border: '1px solid var(--borderColor-default)', borderRadius: 8, padding: 24, background: 'var(--bgColor-muted)', textAlign: 'center' }}>
            <Text style={{ color: 'var(--fgColor-muted)', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>YOUR BALANCE</Text>
            <Heading as="h2" variant="large" style={{ color: 'var(--attention-fgColor)', marginTop: 8 }}>{count.toLocaleString()} ARM</Heading>
            <Text style={{ color: 'var(--fgColor-muted)' }}>≈ ${(count / 1000).toFixed(2)} USD</Text>
          </section>

          <Stack direction="vertical" align="center" gap="normal">
            <Button onClick={tap} aria-label="Mine 100 ARM" variant="primary" size="large" style={{ width: 250, height: 250, borderRadius: '50%', background: 'var(--attention-emphasis)', color: 'var(--fgColor-onEmphasis)', borderColor: 'var(--attention-emphasis)', boxShadow: '0 0 0 10px var(--bgColor-muted), 0 0 0 11px var(--borderColor-default)', transform: isMining ? 'scale(.95)' : 'scale(1)', transition: 'transform var(--base-duration-quick) ease-out' }}>
              <Stack direction="vertical" align="center" gap="condensed">
                <ZapIcon size={44} />
                <strong style={{ fontSize: 22 }}>TAP ARM</strong>
                <Text style={{ color: 'inherit', opacity: 0.8 }}>+100 ARM</Text>
              </Stack>
            </Button>
            <Text style={{ color: 'var(--fgColor-muted)' }}>Tap to mine tokens</Text>
          </Stack>

          <section style={{ borderTop: '1px solid var(--borderColor-default)', paddingTop: 16 }}>
            <Stack direction="horizontal" gap="normal" justify="space-between" align="center">
              <Stack direction="horizontal" gap="condensed" align="center"><Label variant="success">ACTIVE</Label><Text style={{ color: 'var(--fgColor-muted)' }}>Mining rate</Text></Stack>
              <Text style={{ fontWeight: 600 }}>100 ARM / tap</Text>
            </Stack>
          </section>

          <section style={{ border: '1px solid var(--borderColor-default)', borderRadius: 8, padding: 16 }}>
            <Stack direction="horizontal" align="center" justify="space-between">
              <Stack direction="horizontal" gap="condensed" align="center"><TrophyIcon /><Text style={{ fontWeight: 600 }}>Daily streak</Text></Stack>
              <Stack direction="horizontal" gap="condensed" align="center"><Text style={{ color: 'var(--attention-fgColor)', fontWeight: 600 }}>1 day</Text><PlusIcon size={16} /></Stack>
            </Stack>
          </section>

          <nav aria-label="Mining navigation">
            <Stack direction="horizontal" justify="space-between" style={{ borderTop: '1px solid var(--borderColor-default)', paddingTop: 16 }}>
              {navItems.map(({ label, icon: Icon, active }) => (
                <Button key={label} variant="invisible" aria-label={label} style={{ color: active ? 'var(--attention-fgColor)' : 'var(--fgColor-muted)', minWidth: 60 }}>
                  <Stack direction="vertical" align="center" gap="condensed"><Icon size={20} /><Text style={{ fontSize: 12 }}>{label}</Text></Stack>
                </Button>
              ))}
            </Stack>
          </nav>
        </Stack>
      </div>
    </main>
  )
}
