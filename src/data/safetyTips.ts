import { QuickTip } from '../types';

export const SAFETY_TIPS: QuickTip[] = [
  {
    id: 'tip-1',
    title: 'The 60-Second Emotion Check',
    content: 'Whenever an email triggers immediate alarm, panic, or rush, step away for 60 seconds. Coercive urgency is an adversary’s primary psychological tool to bypass your rational critical thinking.',
    category: 'Social Engineering',
    urgency: 'high'
  },
  {
    id: 'tip-2',
    title: 'Inspect the Root Domain, Not the Padlock',
    content: 'HTTPS simply means encrypted transit, not safe ownership. Always examine the root domain immediately preceding the first single forward slash ("/") in the address bar.',
    category: 'Browsing',
    urgency: 'high'
  },
  {
    id: 'tip-3',
    title: 'Out-of-Band Verification',
    content: 'If an email or message requests payment routing alterations or sensitive credentials, call the sender using a phone number from an internal phonebook, NEVER the contact number in the message.',
    category: 'Email',
    urgency: 'high'
  },
  {
    id: 'tip-4',
    title: 'Password Managers as Phishing Detectors',
    content: 'Password managers match domains against stored credentials. If your password manager refuses to auto-fill your credentials on what looks like your bank, you are likely on a phishing clone.',
    category: 'Passwords',
    urgency: 'medium'
  },
  {
    id: 'tip-5',
    title: 'Beware of Sudden Re-Authentications',
    content: 'If you are already logged into your workstation and an email link prompts you to log into Microsoft or Google again, treat it with extreme suspicion.',
    category: 'Email',
    urgency: 'medium'
  },
  {
    id: 'tip-6',
    title: 'Report, Never Delete in Silence',
    content: 'Using your organization’s "Report Phishing" button feeds threat intelligence to SOC teams, protecting colleagues who might receive the same attack minutes later.',
    category: 'Incident',
    urgency: 'standard'
  }
];
