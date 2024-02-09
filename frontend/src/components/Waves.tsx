import Image from 'next/image';
import waveMobile1 from '@/assets/wave_mobile/wave1.svg';
import waveMobile2 from '@/assets/wave_mobile/wave2.svg';
import waveMobile3 from '@/assets/wave_mobile/wave3.svg';
import waveMobile4 from '@/assets/wave_mobile/wave4.svg';
import waveMobile5 from '@/assets/wave_mobile/wave5.svg';
import waveMobile6 from '@/assets/wave_mobile/wave6.svg';
import waveMobile7 from '@/assets/wave_mobile/wave7.svg';
import waveMobile8 from '@/assets/wave_mobile/wave8.svg';
import waveMobile9 from '@/assets/wave_mobile/wave9.svg';
import waveDesktop1 from '@/assets/wave_desktop/wave1.svg';
import waveDesktop2 from '@/assets/wave_desktop/wave2.svg';
import waveDesktop3 from '@/assets/wave_desktop/wave3.svg';
import waveDesktop4 from '@/assets/wave_desktop/wave4.svg';
import waveDesktop5 from '@/assets/wave_desktop/wave5.svg';
import waveDesktop6 from '@/assets/wave_desktop/wave6.svg';
import waveDesktop7 from '@/assets/wave_desktop/wave7.svg';
import waveDesktop8 from '@/assets/wave_desktop/wave8.svg';
import waveDesktop9 from '@/assets/wave_desktop/wave9.svg';

export default function Waves() {
    return (
        <div>
            <div className="relative min-[480px]:hidden">
                <Image src={waveMobile1} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile2} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile3} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile4} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile5} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile6} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile7} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile8} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveMobile9} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
            </div>

            <div className="relative max-[480px]:hidden">
                <Image src={waveDesktop1} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop2} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop3} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop4} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop5} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop6} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop7} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop8} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
                <Image src={waveDesktop9} alt="Vague de décoration" className="absolute bottom-0 left-0 z-[0]"/>
            </div>
        </div>
    )
}
