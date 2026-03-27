# Manual VK E2E Testing

This runbook captures a full manual end-to-end VK Bots plugin test flow from a
fresh VM using the OpenClaw CLI and a real VK group token.

## Scope

This verifies:

- OpenClaw install on the VM
- local plugin install from this checkout
- VK channel setup with a token file
- channel status reporting
- manual pairing approval

This does not verify:

- automated reply correctness
- reconnect behavior after network loss
- multi-account VK routing

## Prerequisites

- VM shell access as a user that can manage the OpenClaw install
- a valid VK group token with Long Poll API enabled
- this repo checked out on the VM

## Clean-Slate Setup

Stop any running gateway and remove previous local state:

```bash
openclaw gateway stop
npm rm -g openclaw
rm -rf ~/.openclaw
```

## Install OpenClaw and Plugin

From the plugin checkout:

```bash
cd openclaw-vkbots-plugin/
git pull
npm install -g openclaw@latest
openclaw onboard --install-daemon
openclaw plugins install .
```

## Configure VK Token File

Create the secrets directory and write the VK token file:

```bash
mkdir -p /root/.openclaw/workspace/secrets/
nano /root/.openclaw/workspace/secrets/vk-token.txt
```

The file should contain only the VK group token.

## Add the VK Channel

Run channel setup using the token file:

```bash
openclaw channels add --channel vk --token-file /root/.openclaw/workspace/secrets/vk-token.txt
```

If you want to compare against the interactive flow first, you can also run:

```bash
openclaw channels add --channel vk
```

## Verify Channel Status

Check that the plugin is installed and the VK channel is configured:

```bash
openclaw channels status
```

Expected outcome:

- `vk` is listed
- the channel does not report missing token configuration
- no plugin id mismatch warning is shown for `vk`

## Touch your VK bot

Go to vk.com and write your bot. 

You will be prompted with a pairing code.

## Verify Pairing Approval

Approve a pending VK pairing code:

```bash
openclaw pairing approve vk APPROVALCODE
```

Expected outcome:

- the pairing request is approved without CLI errors
- the VK user receives the approval notification
- subsequent inbound messages from that user are accepted
