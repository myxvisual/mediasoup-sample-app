module.exports = {
  listenIp: '0.0.0.0',
  listenPort: 3000,
  sslCrt: './certs/cert.pem',
  sslKey: './certs/key.pem',
  mediasoup: {

    // Worker settings
    worker: {
      rtcMinPort: 40000,
      rtcMaxPort: 60000,
      logLevel: 'warn',
      logTags: [
        'info',
        'ice',
        'dtls',
        'rtp',
        'srtp',
        'rtcp',
        // 'rtx',
        // 'bwe',
        // 'score',
        // 'simulcast',
        // 'svc'
      ],
    },

    // Router settings
    router: {
      mediaCodecs:
        [
          {
            kind: 'audio',
            mimeType: 'audio/opus',
            clockRate: 48000,
            channels: 2,
            parameters: {
              minptime: 10,
              useinbandfec: 1
            }
          },
          {
            kind: 'video',
            mimeType: 'video/VP8',
            clockRate: 90000,
            parameters:
              {
                'x-google-start-bitrate': 1000
              }
          },
          {
            kind: "video",
            mimeType: "video/H264",
            preferredPayloadType: 125,
            clockRate: 90000,
            parameters: {
              "level-asymmetry-allowed": 1,
              "packetization-mode": 1,
              "profile-level-id": "42e01f"
            }
          }
        ]
    },

    // WebRtcTransport settings
    webRtcTransport: {
      listenIps: [{ ip: "127.0.0.1", announcedIp: null }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      initialAvailableOutgoingBitrate: 600000,
      minimumAvailableOutgoingBitrate: 300000,
      maxIncomingBitrate: 1500000,
      initialAvailableOutgoingBitrate: 1000000,
    },

    // ----------------------- //
    // PlainRtpTransportOptions
    plainRtpTransport: {
      listenIp: { ip: "127.0.0.1", announcedIp: null }
    },

    client: {
      // ProducerOptions
      videoProducer: {
        // Send video with 3 simulcast streams
        // RTCRtpEncodingParameters[]
        encodings: [
          {
            maxBitrate: 100000
            // maxFramerate: 15.0,
            // scaleResolutionDownBy: 1.5,
          },
          {
            maxBitrate: 300000
          },
          {
            maxBitrate: 900000
          }
        ],
        codecOptions: {
          videoGoogleStartBitrate: 1000
        }
      }
    },

    // Target IP and port for RTP recording
    recording: {
      ip: "127.0.0.1",

      // GStreamer's sdpdemux only supports RTCP = RTP + 1
      audioPort: 5004,
      audioPortRtcp: 5005,
      videoPort: 5006,
      videoPortRtcp: 5007
    }
  }
};
