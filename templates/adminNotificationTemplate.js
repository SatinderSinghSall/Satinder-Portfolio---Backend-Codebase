const adminNotificationTemplate = ({ name, email, subject, message }) => {
  const currentDate = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <style>

    body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: Inter, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    img {
      border: 0;
    }

    a {
      text-decoration: none;
    }

    /* MOBILE */
    @media screen and (max-width: 600px) {

      .container {
        width: 100% !important;
        border-radius: 0 !important;
      }

      .mobile-padding {
        padding: 24px !important;
      }

      .hero-padding {
        padding: 32px 24px !important;
      }

      .hero-title {
        font-size: 30px !important;
        line-height: 1.25 !important;
      }

      .stack-column,
      .stack-column td {
        display: block !important;
        width: 100% !important;
      }

      .detail-label {
        padding-bottom: 8px !important;
      }

      .detail-value {
        padding-top: 0 !important;
      }

      .cta-button {
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }

      .footer-stack,
      .footer-stack td {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
      }

      .footer-badge {
        margin-top: 18px !important;
      }

      .message-box {
        padding: 20px !important;
      }

      .topbar-left,
      .topbar-right {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
      }

      .topbar-right {
        padding-top: 8px !important;
      }

    }

  </style>
</head>

<body>

  <div style="
    background: #f1f5f9;
    padding: 40px 16px;
  ">

    <table width="100%">
      <tr>
        <td align="center">

          <!-- CONTAINER -->
          <table
            class="container"
            width="680"
            style="
              width: 680px;
              max-width: 100%;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 20px;
              overflow: hidden;
              box-shadow:
                0 10px 30px rgba(15,23,42,0.08),
                0 4px 12px rgba(15,23,42,0.04);
            "
          >

            <!-- TOP BAR -->
            <tr>
              <td style="
                background: #0f172a;
                padding: 16px 28px;
              ">

                <table width="100%">
                  <tr>

                    <td class="topbar-left" align="left">

                      <div style="
                        color: #cbd5e1;
                        font-size: 12px;
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        line-height: 1.6;
                      ">
                        Contact Notification System
                      </div>

                    </td>

                    <td class="topbar-right" align="right">

                      <div style="
                        color: #94a3b8;
                        font-size: 12px;
                        line-height: 1.6;
                      ">
                        ${currentDate}
                      </div>

                    </td>

                  </tr>
                </table>

              </td>
            </tr>

            <!-- HERO -->
            <tr>
              <td
                class="hero-padding"
                style="
                  background: #111827;
                  padding: 42px 36px;
                "
              >

                <div style="
                  display: inline-block;
                  background: #1e3a5f;
                  color: #93c5fd;
                  padding: 8px 14px;
                  border-radius: 999px;
                  font-size: 11px;
                  font-weight: 700;
                  letter-spacing: 0.5px;
                  text-transform: uppercase;
                  margin-bottom: 22px;
                ">
                  New Submission
                </div>

                <h1
                  class="hero-title"
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 38px;
                    line-height: 1.2;
                    font-weight: 800;
                    letter-spacing: -1px;
                  "
                >
                  New Contact Message
                </h1>

                <p style="
                  margin: 18px 0 0;
                  color: #cbd5e1;
                  font-size: 16px;
                  line-height: 1.9;
                  max-width: 520px;
                ">
                  A new inquiry was submitted through your portfolio contact form.
                  Review the details below.
                </p>

              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td
                class="mobile-padding"
                style="padding: 36px;"
              >

                <!-- DETAILS CARD -->
                <table
                  width="100%"
                  style="
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    overflow: hidden;
                  "
                >

                  <!-- HEADER -->
                  <tr>
                    <td style="
                      background: #f8fafc;
                      padding: 20px 24px;
                      border-bottom: 1px solid #e5e7eb;
                    ">

                      <h2 style="
                        margin: 0;
                        font-size: 16px;
                        color: #111827;
                        font-weight: 700;
                      ">
                        Contact Details
                      </h2>

                    </td>
                  </tr>

                  <!-- DETAILS -->
                  <tr>
                    <td style="padding: 0 24px;">

                      <table width="100%">

                        <tr class="stack-column">

                          <td
                            class="detail-label"
                            style="
                              width: 120px;
                              padding: 20px 0;
                              border-bottom: 1px solid #f1f5f9;
                              color: #64748b;
                              font-size: 14px;
                              font-weight: 700;
                              vertical-align: top;
                            "
                          >
                            Name
                          </td>

                          <td
                            class="detail-value"
                            style="
                              padding: 20px 0;
                              border-bottom: 1px solid #f1f5f9;
                              color: #111827;
                              font-size: 15px;
                              font-weight: 600;
                            "
                          >
                            ${name}
                          </td>

                        </tr>

                        <tr class="stack-column">

                          <td
                            class="detail-label"
                            style="
                              width: 120px;
                              padding: 20px 0;
                              border-bottom: 1px solid #f1f5f9;
                              color: #64748b;
                              font-size: 14px;
                              font-weight: 700;
                              vertical-align: top;
                            "
                          >
                            Email
                          </td>

                          <td
                            class="detail-value"
                            style="
                              padding: 20px 0;
                              border-bottom: 1px solid #f1f5f9;
                              word-break: break-word;
                            "
                          >
                            <a
                              href="mailto:${email}"
                              style="
                                color: #2563eb;
                                font-size: 15px;
                                font-weight: 600;
                                line-height: 1.8;
                              "
                            >
                              ${email}
                            </a>
                          </td>

                        </tr>

                        <tr class="stack-column">

                          <td
                            class="detail-label"
                            style="
                              width: 120px;
                              padding: 20px 0;
                              border-bottom: 1px solid #f1f5f9;
                              color: #64748b;
                              font-size: 14px;
                              font-weight: 700;
                              vertical-align: top;
                            "
                          >
                            Subject
                          </td>

                          <td
                            class="detail-value"
                            style="
                              padding: 20px 0;
                              border-bottom: 1px solid #f1f5f9;
                              color: #111827;
                              font-size: 15px;
                              font-weight: 600;
                              line-height: 1.8;
                            "
                          >
                            ${subject || "No subject provided"}
                          </td>

                        </tr>

                      </table>

                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td style="
                      padding: 28px 24px 24px;
                    ">

                      <div style="
                        margin-bottom: 14px;
                        color: #64748b;
                        font-size: 13px;
                        font-weight: 700;
                        letter-spacing: 0.6px;
                        text-transform: uppercase;
                      ">
                        Message
                      </div>

                      <div
                        class="message-box"
                        style="
                          background: #f8fafc;
                          border: 1px solid #e2e8f0;
                          border-radius: 14px;
                          padding: 24px;
                          color: #334155;
                          font-size: 15px;
                          line-height: 1.9;
                          white-space: pre-wrap;
                          word-break: break-word;
                        "
                      >
                        ${message}
                      </div>

                    </td>
                  </tr>

                </table>

                <!-- CTA -->
                <table
                  width="100%"
                  style="margin-top: 32px;"
                >
                  <tr>
                    <td align="center">

                      <a
                        href="https://satinderpoetry.com/admin/contact-messages"
                        class="cta-button"
                        style="
                          display: inline-block;
                          background: #111827;
                          color: #ffffff;
                          padding: 16px 28px;
                          border-radius: 12px;
                          font-size: 14px;
                          font-weight: 700;
                          letter-spacing: 0.2px;
                          box-shadow:
                            0 4px 14px rgba(15,23,42,0.15);
                        "
                      >
                        Open Admin Dashboard
                      </a>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="
                background: #f8fafc;
                border-top: 1px solid #e5e7eb;
                padding: 24px 28px;
              ">

                <table
                  width="100%"
                  class="footer-stack"
                >
                  <tr>

                    <td align="left">

                      <div style="
                        color: #111827;
                        font-size: 13px;
                        font-weight: 700;
                        line-height: 1.7;
                      ">
                        satinderpoetry.com
                      </div>

                      <div style="
                        margin-top: 6px;
                        color: #64748b;
                        font-size: 12px;
                        line-height: 1.8;
                      ">
                        Automated contact notification system
                      </div>

                    </td>

                    <td
                      align="right"
                      class="footer-badge"
                    >

                      <div style="
                        display: inline-block;
                        background: #dcfce7;
                        color: #166534;
                        padding: 8px 14px;
                        border-radius: 999px;
                        font-size: 11px;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                      ">
                        SYSTEM ACTIVE
                      </div>

                    </td>

                  </tr>
                </table>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>

</body>
</html>
  `;
};

module.exports = adminNotificationTemplate;
