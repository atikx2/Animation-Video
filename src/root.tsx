import React from 'react';
import {Composition} from 'remotion';
import {Film, Cover, Part, Platform} from './video';

const lengths = [883, 558, 796]; // Round up actual MP3 duration at 30 fps.
export const Root: React.FC = () => <>
  {([1,2,3] as Part[]).flatMap(part => (['youtube','facebook'] as Platform[]).map(platform =>
    <Composition key={`${platform}-${part}`} id={`${platform}-porbo-${part}`} component={Film} width={1080} height={1920} fps={30} durationInFrames={lengths[part-1]} defaultProps={{part, platform}} />
  ))}
  {([1,2,3] as Part[]).flatMap(part => (['youtube','facebook'] as Platform[]).map(platform =>
    <Composition key={`cover-${platform}-${part}`} id={`cover-${platform}-${part}`} component={Cover} width={1080} height={1920} fps={30} durationInFrames={1} defaultProps={{part, platform}} />
  ))}
</>;
