import Image from 'next/image';
import wave1 from '@/assets/wave/wave1.svg';
import wave2 from '@/assets/wave/wave2.svg';
import wave3 from '@/assets/wave/wave3.svg';
import wave4 from '@/assets/wave/wave4.svg';
import wave5 from '@/assets/wave/wave5.svg';
import wave6 from '@/assets/wave/wave6.svg';
import wave7 from '@/assets/wave/wave7.svg';
import wave8 from '@/assets/wave/wave8.svg';
import wave9 from '@/assets/wave/wave9.svg';

export default function Waves() {
    return (
        <div className="relative">
            <Image src={wave1} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave2} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave3} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave4} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave5} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave6} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave7} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave8} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
            <Image src={wave9} alt="" className="absolute bottom-0 left-0 z-[-1]"/>
        </div>
    )
}
