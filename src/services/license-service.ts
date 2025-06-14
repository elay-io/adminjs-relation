import { PACKAGE_NAME } from '@/constants';
import { LicenseStatusEnum } from '@/constants/license-enum';

export interface VerifyLicenseResult {
  status: LicenseStatusEnum;
  msg: string;
}

export class LicenseService {
  private static logFollowInstruction(): void {
    console.log(`
╭────────────────────────────────────────────────────╮
│ 🎉 Thank you for using ${PACKAGE_NAME} 🎉          
│                                                    │
│ 🚀 To unlock full features, please:                │
│   👉 Follow me on LinkedIn: https://www.linkedin.com/in/hero-truong/
│   👉 Star on GitHub: https://github.com/hero-truong
│                                                    │
│ 💡 Provide licenseKey when ready!                  │
╰────────────────────────────────────────────────────╯
    `);
  }

  public static verifyLicense(licenseKey?: string): VerifyLicenseResult {
    if (!licenseKey) {
      this.logFollowInstruction();
      return { status: LicenseStatusEnum.Invalid, msg: 'Missing license key' };
    }

    // 👉 Future: add real license verification logic here

    return { status: LicenseStatusEnum.Valid, msg: 'License key accepted' };
  }
}
