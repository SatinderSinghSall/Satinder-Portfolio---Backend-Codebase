const userAcknowledgementTemplate = ({ name }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <!-- DARK MODE FIX -->
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />

    <title>Thanks for Contacting Me</title>

    <style>

      body {
        margin: 0;
        padding: 0;
        background: #f8fafc !important;
        font-family: Arial, Helvetica, sans-serif;
        color: #0f172a !important;
        -webkit-font-smoothing: antialiased;
      }

      table {
        border-collapse: collapse;
      }

      /* Prevent Gmail dark mode inversion */
      .force-dark-bg {
        background: #ffffff !important;
      }

      .force-dark-text {
        color: #0f172a !important;
      }

      .force-light-text {
        color: #ffffff !important;
      }

      .force-muted {
        color: #64748b !important;
      }

      .hero-bg {
        background: #020617 !important;
      }

      .footer-bg {
        background: #020617 !important;
      }

      .developer-bg {
        background: #f8fafc !important;
      }

      .social-btn {
        background: #ffffff !important;
        color: #0f172a !important;
      }

    </style>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background: #f8fafc;
      font-family: Arial, Helvetica, sans-serif;
      color: #0f172a;
    "
  >

    <!-- WRAPPER -->
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding: 40px 16px;"
    >
      <tr>
        <td align="center">

          <!-- CONTAINER -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            class="force-dark-bg"
            style="
              max-width: 640px;
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              border: 1px solid #e2e8f0;
              box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
            "
          >

            <!-- HERO -->
            <tr>
              <td
                class="hero-bg"
                style="
                  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
                  padding: 50px 30px;
                  text-align: center;
                "
              >

                <p
                  style="
                    margin: 0 0 14px;
                    color: #38bdf8 !important;
                    font-size: 12px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    font-weight: bold;
                  "
                >
                  SATINDER SINGH SALL
                </p>

                <h1
                  class="force-light-text"
                  style="
                    margin: 0;
                    font-size: 38px;
                    line-height: 1.2;
                    color: #ffffff !important;
                    font-weight: 700;
                  "
                >
                  Thanks for Contacting Me 🚀
                </h1>

                <p
                  style="
                    margin: 18px auto 0;
                    max-width: 480px;
                    color: #cbd5e1 !important;
                    font-size: 16px;
                    line-height: 1.7;
                  "
                >
                  Your message has been received successfully.
                  I appreciate your interest and will get back to you soon.
                </p>
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td
                class="force-dark-bg"
                style="
                  padding: 42px 34px;
                  background: #ffffff !important;
                "
              >

                <p
                  class="force-dark-text"
                  style="
                    margin: 0 0 24px;
                    font-size: 18px;
                    color: #0f172a !important;
                    font-weight: 600;
                  "
                >
                  Hi ${name},
                </p>

                <p
                  class="force-dark-text"
                  style="
                    margin: 0 0 20px;
                    font-size: 15px;
                    line-height: 1.9;
                    color: #334155 !important;
                  "
                >
                  Thank you for reaching out through my portfolio website.
                  I've successfully received your message and will respond as soon as possible.
                </p>

                <p
                  class="force-dark-text"
                  style="
                    margin: 0 0 32px;
                    font-size: 15px;
                    line-height: 1.9;
                    color: #334155 !important;
                  "
                >
                  Whether it's collaboration, freelance work, product development,
                  or a technical discussion — I genuinely appreciate you taking the time to connect.
                </p>

                <!-- CTA -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="margin-top: 18px;"
                >
                  <tr>

                    <td
                      style="
                        border-radius: 16px;
                        background: linear-gradient(
                          135deg,
                          #2563eb 0%,
                          #0ea5e9 100%
                        );
                        box-shadow:
                          0 10px 24px rgba(37,99,235,0.22),
                          inset 0 1px 0 rgba(255,255,255,0.15);
                      "
                    >

                      <a
                        href="https://satinder-portfolio.vercel.app"
                        target="_blank"
                        style="
                          display: inline-block;
                          padding: 15px 22px;
                          color: #ffffff !important;
                          text-decoration: none;
                          font-size: 15px;
                          font-weight: 700;
                          line-height: 18px;
                          letter-spacing: 0.2px;
                        "
                      >

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                          width="18"
                          height="18"
                          style="
                            vertical-align: middle;
                            margin-right: 10px;
                            display: inline-block;
                          "
                        />

                        <span
                          style="
                            vertical-align: middle;
                            display: inline-block;
                            color: #ffffff !important;
                          "
                        >
                          Visit Portfolio
                        </span>

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
                          width="13"
                          height="13"
                          style="
                            vertical-align: middle;
                            margin-left: 12px;
                            display: inline-block;
                            opacity: 0.95;
                          "
                        />

                      </a>

                    </td>

                  </tr>
                </table>
              </td>
            </tr>

            <!-- DEVELOPER CREDIT -->
            <tr>
              <td
                class="developer-bg"
                style="
                  padding: 56px 34px;
                  background: linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
                  ) !important;
                  border-top: 1px solid #e2e8f0;
                  text-align: center;
                "
              >

                <!-- LABEL -->
                <p
                  style="
                    margin: 0 0 18px;
                    font-size: 11px;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    color: #06b6d4 !important;
                    font-weight: 700;
                  "
                >
                  Crafted & Developed By
                </p>

                <!-- NAME -->
                <div
                  style="
                    display: inline-block;
                    background: #111827;
                    padding: 10px 22px;
                    border-radius: 14px;
                    margin-top: 6px;
                  "
                >
                  <h2
                    style="
                      margin: 0;
                      font-size: 42px;
                      line-height: 1.15;
                      font-weight: 800;
                      letter-spacing: -1px;

                      color: #ffffff !important;
                      -webkit-text-fill-color: #ffffff !important;
                    "
                  >
                    Satinder Singh Sall
                  </h2>
                </div>
                <!-- GRADIENT LINE -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="margin-top: 22px;"
                >
                  <tr>
                    <td
                      style="
                        width: 130px;
                        height: 4px;
                        border-radius: 999px;
                        background: linear-gradient(
                          90deg,
                          #2563eb,
                          #06b6d4
                        );
                      "
                    ></td>
                  </tr>
                </table>

                <!-- SUBTEXT -->
                <p
                  class="force-muted"
                  style="
                    margin: 24px 0 0;
                    color: #64748b !important;
                    font-size: 15px;
                    line-height: 1.9;
                    font-weight: 500;
                  "
                >
                  Full-Stack Engineer · UI/UX Focused · Scalable Systems
                </p>

                <!-- SOCIAL LINKS -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="margin-top: 34px;"
                >
                  <tr>

                    <!-- GITHUB -->
                    <td style="padding: 6px;">
                      <a
                        href="https://github.com/SatinderSinghSall"
                        target="_blank"
                        class="social-btn"
                        style="
                          display: inline-block;
                          background: #ffffff !important;
                          border: 1px solid #dbeafe;
                          border-radius: 14px;
                          padding: 12px 18px;
                          text-decoration: none;
                          color: #0f172a !important;
                          font-size: 14px;
                          font-weight: 600;
                          box-shadow: 0 4px 12px rgba(37,99,235,0.08);
                        "
                      >

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                          width="18"
                          height="18"
                          style="
                            vertical-align: middle;
                            margin-right: 8px;
                            display: inline-block;
                          "
                        />

                        <span style="vertical-align: middle;">
                          GitHub
                        </span>

                      </a>
                    </td>

                    <!-- LINKEDIN -->
                    <td style="padding: 6px;">
                      <a
                        href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/"
                        target="_blank"
                        class="social-btn"
                        style="
                          display: inline-block;
                          background: #ffffff !important;
                          border: 1px solid #dbeafe;
                          border-radius: 14px;
                          padding: 12px 18px;
                          text-decoration: none;
                          color: #0f172a !important;
                          font-size: 14px;
                          font-weight: 600;
                          box-shadow: 0 4px 12px rgba(37,99,235,0.08);
                        "
                      >

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                          width="18"
                          height="18"
                          style="
                            vertical-align: middle;
                            margin-right: 8px;
                            display: inline-block;
                          "
                        />

                        <span style="vertical-align: middle;">
                          LinkedIn
                        </span>

                      </a>
                    </td>

                  </tr>

                  <tr>

                    <!-- YOUTUBE -->
                    <td style="padding: 6px;">
                      <a
                        href="https://www.youtube.com/@satindersinghsall.3841/featured"
                        target="_blank"
                        class="social-btn"
                        style="
                          display: inline-block;
                          background: #ffffff !important;
                          border: 1px solid #dbeafe;
                          border-radius: 14px;
                          padding: 12px 18px;
                          text-decoration: none;
                          color: #0f172a !important;
                          font-size: 14px;
                          font-weight: 600;
                          box-shadow: 0 4px 12px rgba(37,99,235,0.08);
                        "
                      >

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                          width="18"
                          height="18"
                          style="
                            vertical-align: middle;
                            margin-right: 8px;
                            display: inline-block;
                          "
                        />

                        <span style="vertical-align: middle;">
                          YouTube
                        </span>

                      </a>
                    </td>

                    <!-- TWITTER -->
                    <td style="padding: 6px;">
                      <a
                        href="https://x.com/SallSatinder"
                        target="_blank"
                        class="social-btn"
                        style="
                          display: inline-block;
                          background: #ffffff !important;
                          border: 1px solid #dbeafe;
                          border-radius: 14px;
                          padding: 12px 18px;
                          text-decoration: none;
                          color: #0f172a !important;
                          font-size: 14px;
                          font-weight: 600;
                          box-shadow: 0 4px 12px rgba(37,99,235,0.08);
                        "
                      >

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png"
                          width="18"
                          height="18"
                          style="
                            vertical-align: middle;
                            margin-right: 8px;
                            display: inline-block;
                          "
                        />

                        <span style="vertical-align: middle;">
                          Twitter / X
                        </span>

                      </a>
                    </td>

                  </tr>
                </table>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td
                class="footer-bg"
                style="
                  padding: 22px;
                  background: #020617 !important;
                  text-align: center;
                "
              >

                <p
                  style="
                    margin: 0;
                    color: #94a3b8 !important;
                    font-size: 12px;
                    line-height: 1.7;
                  "
                >
                  © ${new Date().getFullYear()} Satinder Singh Sall ·
                  Crafted with precision & modern technologies.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = userAcknowledgementTemplate;
