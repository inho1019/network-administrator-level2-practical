import type {
  AllAnswerTypes,
  NetworkAnswers,
  DHCPAnswers,
  FTPAnswers,
  DNSAnswers,
  DNSReverseAnswers,
  SecurityAnswers,
  WebsiteAnswers,
  UserAnswers,
  ServiceAnswers,
  FirewallAnswers,
  ShareAnswers,
  DiskAnswers,
  IISAnswers,
} from "../../types";

// 네트워크 설정 GUI 컴포넌트
export function NetworkSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: NetworkAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<NetworkAnswers>;

  const handleChange = (field: keyof NetworkAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof NetworkAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">
            인터넷 프로토콜 버전 4 (TCP/IPv4) 속성
          </span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <label className="radio-option">
              <input type="radio" checked readOnly />
              <span>다음 IP 주소 사용:</span>
            </label>

            <div className="input-group">
              <label className="input-label">IP 주소(I):</label>
              <input
                type="text"
                className={getInputClass("ip")}
                value={inputs.ip || ""}
                onChange={(e) => handleChange("ip", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">서브넷 마스크(U):</label>
              <input
                type="text"
                className={getInputClass("subnet")}
                value={inputs.subnet || ""}
                onChange={(e) => handleChange("subnet", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">기본 게이트웨이(D):</label>
              <input
                type="text"
                className={getInputClass("gateway")}
                value={inputs.gateway || ""}
                onChange={(e) => handleChange("gateway", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.dns && (
            <div className="dialog-section">
              <label className="radio-option">
                <input type="radio" checked readOnly />
                <span>다음 DNS 서버 주소 사용:</span>
              </label>

              <div className="input-group">
                <label className="input-label">기본 설정 DNS 서버(P):</label>
                <input
                  type="text"
                  className={getInputClass("dns")}
                  value={inputs.dns || ""}
                  onChange={(e) => handleChange("dns", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DHCP 설정 GUI 컴포넌트
export function DHCPSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: DHCPAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<DHCPAnswers>;

  const handleChange = (field: keyof DHCPAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof DHCPAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 범위 마법사</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">IP 주소 범위</h4>

            <div className="input-group">
              <label className="input-label">시작 IP 주소:</label>
              <input
                type="text"
                className={getInputClass("startIP")}
                value={inputs.startIP || ""}
                onChange={(e) => handleChange("startIP", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">종료 IP 주소:</label>
              <input
                type="text"
                className={getInputClass("endIP")}
                value={inputs.endIP || ""}
                onChange={(e) => handleChange("endIP", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">서브넷 마스크:</label>
              <input
                type="text"
                className={getInputClass("subnet")}
                value={inputs.subnet || ""}
                onChange={(e) => handleChange("subnet", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.excludeStart && (
            <div className="dialog-section">
              <h4 className="section-title">제외할 주소</h4>

              <div className="input-group">
                <label className="input-label">시작 IP:</label>
                <input
                  type="text"
                  className={getInputClass("excludeStart")}
                  value={inputs.excludeStart || ""}
                  onChange={(e) => handleChange("excludeStart", e.target.value)}
                  disabled={showResult}
                />
              </div>

              <div className="input-group">
                <label className="input-label">종료 IP:</label>
                <input
                  type="text"
                  className={getInputClass("excludeEnd")}
                  value={inputs.excludeEnd || ""}
                  onChange={(e) => handleChange("excludeEnd", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}

          {correctAnswers.leaseHours && (
            <div className="dialog-section">
              <h4 className="section-title">임대 기간</h4>

              <div className="input-group">
                <label className="input-label">시간:</label>
                <input
                  type="text"
                  className={getInputClass("leaseHours")}
                  value={inputs.leaseHours || ""}
                  onChange={(e) => handleChange("leaseHours", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}

          {correctAnswers.gateway && (
            <div className="dialog-section">
              <h4 className="section-title">라우터 (기본 게이트웨이)</h4>

              <div className="input-group">
                <label className="input-label">IP 주소:</label>
                <input
                  type="text"
                  className={getInputClass("gateway")}
                  value={inputs.gateway || ""}
                  onChange={(e) => handleChange("gateway", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// FTP 설정 GUI 컴포넌트
export function FTPSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: FTPAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<FTPAnswers>;

  const handleChange = (field: keyof FTPAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof FTPAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">FTP 사이트 추가</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">FTP 사이트 이름:</label>
              <input
                type="text"
                className={getInputClass("siteName")}
                value={inputs.siteName || ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">IP 주소:</label>
              <input
                type="text"
                className={getInputClass("ip")}
                value={inputs.ip || ""}
                onChange={(e) => handleChange("ip", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">포트:</label>
              <input
                type="text"
                className={getInputClass("port")}
                value={inputs.port || ""}
                onChange={(e) => handleChange("port", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.welcomeMessage && (
            <div className="dialog-section">
              <h4 className="section-title">메시지</h4>

              <div className="input-group">
                <label className="input-label">시작 메시지:</label>
                <input
                  type="text"
                  className={getInputClass("welcomeMessage")}
                  value={inputs.welcomeMessage || ""}
                  onChange={(e) =>
                    handleChange("welcomeMessage", e.target.value)
                  }
                  disabled={showResult}
                />
              </div>

              {correctAnswers.exitMessage && (
                <div className="input-group">
                  <label className="input-label">종료 메시지:</label>
                  <input
                    type="text"
                    className={getInputClass("exitMessage")}
                    value={inputs.exitMessage || ""}
                    onChange={(e) =>
                      handleChange("exitMessage", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DNS 설정 GUI 컴포넌트
export function DNSSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: DNSAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<DNSAnswers>;

  const handleChange = (field: keyof DNSAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof DNSAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 영역 마법사</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">영역 이름:</label>
              <input
                type="text"
                className={getInputClass("zoneName")}
                value={inputs.zoneName || ""}
                onChange={(e) => handleChange("zoneName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">영역 유형:</label>
              <input
                type="text"
                className={getInputClass("zoneType")}
                value={inputs.zoneType || ""}
                onChange={(e) => handleChange("zoneType", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.hostName && (
            <div className="dialog-section">
              <h4 className="section-title">새 호스트</h4>

              <div className="input-group">
                <label className="input-label">호스트 이름:</label>
                <input
                  type="text"
                  className={getInputClass("hostName")}
                  value={inputs.hostName || ""}
                  onChange={(e) => handleChange("hostName", e.target.value)}
                  disabled={showResult}
                />
              </div>

              {correctAnswers.hostIP && (
                <div className="input-group">
                  <label className="input-label">IP 주소:</label>
                  <input
                    type="text"
                    className={getInputClass("hostIP")}
                    value={inputs.hostIP || ""}
                    onChange={(e) => handleChange("hostIP", e.target.value)}
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DNS 역방향 조회 영역 GUI 컴포넌트
export function DNSReverseSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: DNSReverseAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<DNSReverseAnswers>;

  const handleChange = (field: keyof DNSReverseAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof DNSReverseAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">역방향 조회 영역 마법사</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">역방향 조회 영역</h4>

            <div className="input-group">
              <label className="input-label">네트워크 ID:</label>
              <input
                type="text"
                className={getInputClass("networkID")}
                value={inputs.networkID || ""}
                onChange={(e) => handleChange("networkID", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">영역 유형:</label>
              <input
                type="text"
                className={getInputClass("zoneType")}
                value={inputs.zoneType || ""}
                onChange={(e) => handleChange("zoneType", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          <div className="dialog-section">
            <h4 className="section-title">PTR 레코드</h4>

            <div className="input-group">
              <label className="input-label">IP 주소:</label>
              <input
                type="text"
                className={getInputClass("ptrIP")}
                value={inputs.ptrIP || ""}
                onChange={(e) => handleChange("ptrIP", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">호스트 이름:</label>
              <input
                type="text"
                className={getInputClass("ptrHostName")}
                value={inputs.ptrHostName || ""}
                onChange={(e) => handleChange("ptrHostName", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 로컬 보안 정책 GUI 컴포넌트
export function SecuritySettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: SecurityAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<SecurityAnswers>;

  const handleChange = (field: keyof SecurityAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof SecurityAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">로컬 보안 정책</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          {correctAnswers.loginMessage && (
            <div className="dialog-section">
              <h4 className="section-title">보안 옵션</h4>

              <div className="input-group">
                <label className="input-label">로그온 메시지 제목:</label>
                <input
                  type="text"
                  className={getInputClass("loginMessage")}
                  value={inputs.loginMessage || ""}
                  onChange={(e) => handleChange("loginMessage", e.target.value)}
                  disabled={showResult}
                />
              </div>
            </div>
          )}

          {(correctAnswers.minPasswordAge || correctAnswers.maxPasswordAge) && (
            <div className="dialog-section">
              <h4 className="section-title">암호 정책</h4>

              {correctAnswers.minPasswordAge && (
                <div className="input-group">
                  <label className="input-label">
                    최소 암호 사용 기간 (일):
                  </label>
                  <input
                    type="text"
                    className={getInputClass("minPasswordAge")}
                    value={inputs.minPasswordAge || ""}
                    onChange={(e) =>
                      handleChange("minPasswordAge", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}

              {correctAnswers.maxPasswordAge && (
                <div className="input-group">
                  <label className="input-label">
                    최대 암호 사용 기간 (일):
                  </label>
                  <input
                    type="text"
                    className={getInputClass("maxPasswordAge")}
                    value={inputs.maxPasswordAge || ""}
                    onChange={(e) =>
                      handleChange("maxPasswordAge", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}

          {(correctAnswers.lockoutAttempts ||
            correctAnswers.lockoutDuration) && (
            <div className="dialog-section">
              <h4 className="section-title">계정 잠금 정책</h4>

              {correctAnswers.lockoutAttempts && (
                <div className="input-group">
                  <label className="input-label">계정 잠금 임계값 (회):</label>
                  <input
                    type="text"
                    className={getInputClass("lockoutAttempts")}
                    value={inputs.lockoutAttempts || ""}
                    onChange={(e) =>
                      handleChange("lockoutAttempts", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}

              {correctAnswers.lockoutDuration && (
                <div className="input-group">
                  <label className="input-label">계정 잠금 기간 (분):</label>
                  <input
                    type="text"
                    className={getInputClass("lockoutDuration")}
                    value={inputs.lockoutDuration || ""}
                    onChange={(e) =>
                      handleChange("lockoutDuration", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 웹사이트 설정 GUI 컴포넌트
export function WebsiteSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: WebsiteAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<WebsiteAnswers>;

  const handleChange = (field: keyof WebsiteAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof WebsiteAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      inputValue?.toLowerCase().trim() === correctValue?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">사이트 추가</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">사이트 이름:</label>
              <input
                type="text"
                className={getInputClass("siteName")}
                value={inputs.siteName || ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">IP 주소:</label>
              <input
                type="text"
                className={getInputClass("ip")}
                value={inputs.ip || ""}
                onChange={(e) => handleChange("ip", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">포트:</label>
              <input
                type="text"
                className={getInputClass("port")}
                value={inputs.port || ""}
                onChange={(e) => handleChange("port", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">실제 경로:</label>
              <input
                type="text"
                className={getInputClass("physicalPath")}
                value={inputs.physicalPath || ""}
                onChange={(e) => handleChange("physicalPath", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.defaultDocument && (
            <div className="dialog-section">
              <h4 className="section-title">기본 문서</h4>

              <div className="input-group">
                <label className="input-label">파일 이름:</label>
                <input
                  type="text"
                  className={getInputClass("defaultDocument")}
                  value={inputs.defaultDocument || ""}
                  onChange={(e) =>
                    handleChange("defaultDocument", e.target.value)
                  }
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 사용자 관리 GUI 컴포넌트
export function UserSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: UserAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<UserAnswers>;

  const handleChange = (field: keyof UserAnswers, value: string | string[]) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const handleGroupsChange = (value: string) => {
    const groups = value
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g);
    handleChange("groups", groups);
  };

  const getInputClass = (field: keyof UserAnswers) => {
    if (!showResult) return "windows-input";
    if (field === "groups") {
      const userGroups = inputs.groups || [];
      const correctGroups = correctAnswers.groups;
      const isCorrect =
        userGroups.length === correctGroups.length &&
        correctGroups.every((g) => userGroups.includes(g));
      return `windows-input ${isCorrect ? "input-correct" : "input-incorrect"}`;
    }
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 사용자</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <div className="input-group">
              <label className="input-label">사용자 이름:</label>
              <input
                type="text"
                className={getInputClass("username")}
                value={inputs.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">전체 이름:</label>
              <input
                type="text"
                className={getInputClass("fullName")}
                value={inputs.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">암호:</label>
              <input
                type="password"
                className={getInputClass("password")}
                value={inputs.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          <div className="dialog-section">
            <h4 className="section-title">소속 그룹</h4>

            <div className="input-group">
              <label className="input-label">그룹 (쉼표로 구분):</label>
              <input
                type="text"
                className={getInputClass("groups")}
                value={inputs.groups?.join(", ") || ""}
                onChange={(e) => handleGroupsChange(e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>

          {correctAnswers.sessionMinutes && (
            <div className="dialog-section">
              <h4 className="section-title">세션 설정</h4>

              <div className="input-group">
                <label className="input-label">세션 제한 (분):</label>
                <input
                  type="text"
                  className={getInputClass("sessionMinutes")}
                  value={inputs.sessionMinutes || ""}
                  onChange={(e) =>
                    handleChange("sessionMinutes", e.target.value)
                  }
                  disabled={showResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 서비스 관리 GUI 컴포넌트
export function ServiceSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: ServiceAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<ServiceAnswers>;

  const handleChange = (field: keyof ServiceAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof ServiceAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">
            {correctAnswers.serviceName} 속성
          </span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">서비스 정보</h4>

            <div className="input-group">
              <label className="input-label">서비스 이름:</label>
              <input
                type="text"
                className="windows-input"
                value={correctAnswers.serviceName}
                disabled
                style={{ backgroundColor: "#e8e8e8" }}
              />
            </div>

            {correctAnswers.startupType && (
              <div className="input-group">
                <label className="input-label">시작 유형:</label>
                <select
                  className={getInputClass("startupType")}
                  value={inputs.startupType || ""}
                  onChange={(e) => handleChange("startupType", e.target.value)}
                  disabled={showResult}
                >
                  <option value="">선택하세요</option>
                  <option value="자동">자동</option>
                  <option value="수동">수동</option>
                  <option value="사용안함">사용안함</option>
                </select>
              </div>
            )}

            {correctAnswers.serviceStatus && (
              <div className="input-group">
                <label className="input-label">서비스 상태:</label>
                <select
                  className={getInputClass("serviceStatus")}
                  value={inputs.serviceStatus || ""}
                  onChange={(e) =>
                    handleChange("serviceStatus", e.target.value)
                  }
                  disabled={showResult}
                >
                  <option value="">선택하세요</option>
                  <option value="실행 중">실행 중</option>
                  <option value="중지">중지</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 방화벽 설정 GUI 컴포넌트
export function FirewallSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: FirewallAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<FirewallAnswers>;

  const handleChange = (field: keyof FirewallAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof FirewallAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 인바운드/아웃바운드 규칙</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">방화벽 규칙 설정</h4>

            <div className="input-group">
              <label className="input-label">규칙 이름:</label>
              <input
                type="text"
                className={getInputClass("ruleName")}
                value={inputs.ruleName || ""}
                onChange={(e) => handleChange("ruleName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">포트 번호:</label>
              <input
                type="text"
                className={getInputClass("port")}
                value={inputs.port || ""}
                onChange={(e) => handleChange("port", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">프로토콜:</label>
              <select
                className={getInputClass("protocol")}
                value={inputs.protocol || ""}
                onChange={(e) => handleChange("protocol", e.target.value)}
                disabled={showResult}
              >
                <option value="">선택하세요</option>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">작업:</label>
              <select
                className={getInputClass("action")}
                value={inputs.action || ""}
                onChange={(e) => handleChange("action", e.target.value)}
                disabled={showResult}
              >
                <option value="">선택하세요</option>
                <option value="연결 허용">연결 허용</option>
                <option value="연결 차단">연결 차단</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 공유 폴더 설정 GUI 컴포넌트
export function ShareSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: ShareAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<ShareAnswers>;

  const handleChange = (field: keyof ShareAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof ShareAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">폴더 공유 설정</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">공유 설정</h4>

            <div className="input-group">
              <label className="input-label">폴더 경로:</label>
              <input
                type="text"
                className={getInputClass("folderPath")}
                value={inputs.folderPath || ""}
                onChange={(e) => handleChange("folderPath", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">공유 이름:</label>
              <input
                type="text"
                className={getInputClass("shareName")}
                value={inputs.shareName || ""}
                onChange={(e) => handleChange("shareName", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">공유 권한:</label>
              <input
                type="text"
                className={getInputClass("sharePermission")}
                value={inputs.sharePermission || ""}
                onChange={(e) =>
                  handleChange("sharePermission", e.target.value)
                }
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">NTFS 권한:</label>
              <input
                type="text"
                className={getInputClass("ntfsPermission")}
                value={inputs.ntfsPermission || ""}
                onChange={(e) => handleChange("ntfsPermission", e.target.value)}
                disabled={showResult}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 디스크 관리 GUI 컴포넌트
export function DiskSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: DiskAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<DiskAnswers>;

  const handleChange = (field: keyof DiskAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof DiskAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">새 미러 볼륨</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">볼륨 설정</h4>

            <div className="input-group">
              <label className="input-label">볼륨 크기:</label>
              <input
                type="text"
                className={getInputClass("volumeSize")}
                value={inputs.volumeSize || ""}
                onChange={(e) => handleChange("volumeSize", e.target.value)}
                disabled={showResult}
              />
            </div>

            <div className="input-group">
              <label className="input-label">드라이브 문자:</label>
              <input
                type="text"
                className={getInputClass("driveLetter")}
                value={inputs.driveLetter || ""}
                onChange={(e) => handleChange("driveLetter", e.target.value)}
                disabled={showResult}
                maxLength={1}
              />
            </div>

            <div className="input-group">
              <label className="input-label">파일 시스템:</label>
              <select
                className={getInputClass("fileSystem")}
                value={inputs.fileSystem || ""}
                onChange={(e) => handleChange("fileSystem", e.target.value)}
                disabled={showResult}
              >
                <option value="">선택하세요</option>
                <option value="NTFS">NTFS</option>
                <option value="FAT32">FAT32</option>
                <option value="exFAT">exFAT</option>
              </select>
            </div>

            {correctAnswers.raidType && (
              <div className="input-group">
                <label className="input-label">RAID 유형:</label>
                <input
                  type="text"
                  className="windows-input"
                  value={correctAnswers.raidType}
                  disabled
                  style={{ backgroundColor: "#e8e8e8" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// IIS 설정 GUI 컴포넌트
export function IISSettingsGUI({
  userInputs,
  setUserInputs,
  correctAnswers,
  showResult,
}: {
  userInputs: Partial<AllAnswerTypes>;
  setUserInputs: (inputs: Partial<AllAnswerTypes>) => void;
  correctAnswers: IISAnswers;
  showResult: boolean;
}) {
  const inputs = userInputs as Partial<IISAnswers>;

  const handleChange = (field: keyof IISAnswers, value: string) => {
    setUserInputs({ ...userInputs, [field]: value });
  };

  const getInputClass = (field: keyof IISAnswers) => {
    if (!showResult) return "windows-input";
    const inputValue = inputs[field];
    const correctValue = correctAnswers[field];
    if (!correctValue) return "windows-input";
    const isFieldCorrect =
      String(inputValue)?.toLowerCase().trim() ===
      String(correctValue)?.toLowerCase().trim();
    return `windows-input ${isFieldCorrect ? "input-correct" : "input-incorrect"}`;
  };

  return (
    <div className="windows-gui-container">
      <div className="windows-dialog">
        <div className="dialog-title-bar">
          <span className="dialog-title">IIS 관리자</span>
          <div className="title-bar-buttons">
            <span className="title-button">_</span>
            <span className="title-button">□</span>
            <span className="title-button">✕</span>
          </div>
        </div>

        <div className="dialog-content">
          <div className="dialog-section">
            <h4 className="section-title">사이트 설정</h4>

            <div className="input-group">
              <label className="input-label">사이트 이름:</label>
              <input
                type="text"
                className={getInputClass("siteName")}
                value={inputs.siteName || ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
                disabled={showResult}
              />
            </div>

            {correctAnswers.defaultDoc1 && (
              <>
                <div className="input-group">
                  <label className="input-label">기본 문서 1순위:</label>
                  <input
                    type="text"
                    className={getInputClass("defaultDoc1")}
                    value={inputs.defaultDoc1 || ""}
                    onChange={(e) =>
                      handleChange("defaultDoc1", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">기본 문서 2순위:</label>
                  <input
                    type="text"
                    className={getInputClass("defaultDoc2")}
                    value={inputs.defaultDoc2 || ""}
                    onChange={(e) =>
                      handleChange("defaultDoc2", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">기본 문서 3순위:</label>
                  <input
                    type="text"
                    className={getInputClass("defaultDoc3")}
                    value={inputs.defaultDoc3 || ""}
                    onChange={(e) =>
                      handleChange("defaultDoc3", e.target.value)
                    }
                    disabled={showResult}
                  />
                </div>
              </>
            )}

            {correctAnswers.directoryBrowsing && (
              <div className="input-group">
                <label className="input-label">디렉터리 검색:</label>
                <select
                  className={getInputClass("directoryBrowsing")}
                  value={inputs.directoryBrowsing || ""}
                  onChange={(e) =>
                    handleChange("directoryBrowsing", e.target.value)
                  }
                  disabled={showResult}
                >
                  <option value="">선택하세요</option>
                  <option value="사용">사용</option>
                  <option value="사용안함">사용안함</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
