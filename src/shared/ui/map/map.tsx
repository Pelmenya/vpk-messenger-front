import { YMaps, Map as MapComponent, Placemark } from '@pbe/react-yandex-maps';
import { Loading } from '../loading/loading';

export type MapProps = {
    coordinates: number[] | null;
    zoom?: number; 
};

export const Map = ({ coordinates, zoom = 17 }: MapProps) => {
    if (!coordinates) {
        return <Loading size='loading-lg' color='text-primary' type='loading-infinity' />; // Или отображайте индикатор загрузки
    }
    
    return (
        <YMaps
            query={{
                apikey: import.meta.env.VITE_YM_API_KEY,
            }}
        >
            <div className='border border-base-300 bg-base-100 rounded-box p-4'>
                <MapComponent
                    state={{ center: coordinates, zoom }}
                    width={'250px'}
                    height={'250px'}
                >
                    <Placemark geometry={coordinates} />
                </MapComponent>
            </div>
        </YMaps>
    );
};
