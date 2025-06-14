import { PACKAGE_NAME } from '@/constants';
import { LicenseStatusEnum } from '@/constants/license-enum';

export interface VerifyLicenseResult {
  status: LicenseStatusEnum;
  msg: string;
}

const LICENSE_URL =
  'https://gist.githubusercontent.com/hero-truong/6ff5842adc2a2dba2a57a0e96adcd90c/raw/3ee6edec8b4fae33c0d746503d09192f5de143a4/licenses.json';

export class LicenseService {
  private static licenseCache: string[] | null = null;

  private static logFollowInstruction(): void {
    console.warn(`
╭────────────────────────────────────────────────────────────╮
│ 🎉 Thank you for using ${PACKAGE_NAME}!                    │
│                                                            │
│ ✅ This package is free to use.                            │
│                                                            │
│ 🙏 If you find it helpful, you can support the project by: │
│   👉 Following me on LinkedIn: https://www.linkedin.com/in/hero-truong/
│   👉 Giving a star on GitHub: https://github.com/hero-truong
│                                                            │
│ 🎁 If you follow & contact me, I can provide you a license │
│    key to remove this message permanently.                 │
│                                                            │
╰────────────────────────────────────────────────────────────╯
  `);
  }

  private static async fetchLicenseList(): Promise<string[]> {
    if (this.licenseCache) {
      return this.licenseCache;
    }

    const response = await fetch(LICENSE_URL);
    if (!response.ok) {
      console.error('Failed to fetch license list from Gist.');
      return [];
    }

    const data: string[] = await response.json();
    this.licenseCache = data;
    return data;
  }

  public static async verifyLicense(licenseKey?: string): Promise<VerifyLicenseResult> {
    if (!licenseKey) {
      this.logFollowInstruction();
      return { status: LicenseStatusEnum.Free, msg: 'Running in free mode' };
    }

    const licenses = await this.fetchLicenseList();

    if (licenses.includes(licenseKey)) {
      return { status: LicenseStatusEnum.Valid, msg: 'License key accepted' };
    } else {
      console.warn('Invalid license key provided');
      this.logFollowInstruction();
      return { status: LicenseStatusEnum.Invalid, msg: 'Invalid license key' };
    }
  }
}
