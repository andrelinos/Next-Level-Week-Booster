import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import Header from '../../components/Header';

import {
  Container,
  FieldGroup,
  FormField,
  MapArea,
  MapContent,
} from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [itemsEco, setItemsEco] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('/items').then(response => {
      setItemsEco(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items,
    };

    await api.post('/points', data);

    alert('Ponto de coleta criado');

    history.push('/');
  }

  return (
    <>
      <Header />

      <Container>
        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro do
            <br /> ponto de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados da entidade</h2>
            </legend>

            <FormField>
              <label htmlFor="name">Nome da entidade</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="name"
                id="name"
              />
            </FormField>

            <FieldGroup>
              <FormField>
                <label htmlFor="email">E-mail</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="email"
                  id="email"
                />
              </FormField>

              <FormField>
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                />
              </FormField>
            </FieldGroup>

            <FieldGroup>
              <FormField>
                <label htmlFor="address">Endereço</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="address"
                  id="address"
                />
              </FormField>

              <FormField style={{ maxWidth: 200 }}>
                <label htmlFor="number">Número</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="number"
                  id="number"
                />
              </FormField>
            </FieldGroup>

            <FieldGroup>
              <FormField>
                <label htmlFor="uf">Estado (UF)</label>

                <select
                  value={selectedUf}
                  onChange={handleSelectUf}
                  name="uf"
                  id="uf"
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField>
                <label htmlFor="city">Cidade</label>
                <select onChange={handleSelectCity} name="city" id="city">
                  <option value="0">Selecione uma cidade</option>

                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </FormField>
            </FieldGroup>
          </fieldset>
          <MapArea>
            <legend>
              <h2>Mapa</h2>
              <span>Defina o pin no mapa</span>
            </legend>

            <MapContent>
              <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedPosition} />
              </Map>
              <div id="mapid" />
            </MapContent>
          </MapArea>

          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <ul>
              {itemsEco.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <div>
            <button type="submit">Cadastrar novo ponto de coleta</button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreatePoint;
