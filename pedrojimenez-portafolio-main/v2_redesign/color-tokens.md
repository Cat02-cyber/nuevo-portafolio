# Material Design 3 — Color Tokens Reference

Colores extraídos de los esquemas Light y Dark proporcionados.

---

## 🌞 Light Scheme

### Primary
| Token                   | Color (aprox.)  | Descripción                   |
|-------------------------|-----------------|-------------------------------|
| Primary                 | `#3B4685`       | Azul medio-oscuro             |
| On Primary              | `#FFFFFF`       | Blanco (texto sobre Primary)  |
| Primary Container       | `#5B6ABF`       | Azul medio                    |
| On Primary Container    | `#1A2460`       | Azul oscuro                   |

### Secondary
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Secondary               | `#585E71`       |
| On Secondary            | `#FFFFFF`       |
| Secondary Container     | `#8B92A8`       |
| On Secondary Container  | `#3E4457`       |

### Tertiary
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Tertiary                | `#6E5E7E`       |
| On Tertiary             | `#FFFFFF`       |
| Tertiary Container      | `#9688A5`       |
| On Tertiary Container   | `#4A3B5A`       |

### Error
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Error                   | `#BA1A1A`       |
| On Error                | `#FFFFFF`       |
| Error Container         | `#FFDAD6`       |
| On Error Container      | `#410002`       |

### Surface
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Surface Dim             | `#D6D6D6`       |
| Surface                 | `#F5F5F5`       |
| Surface Bright          | `#F5F5F5`       |
| Surf. Container Lowest  | `#FFFFFF`       |
| Surf. Container Low     | `#F0F0F0`       |
| Surf. Container         | `#EAEAEA`       |
| Surf. Container High    | `#E4E4E4`       |
| Surf. Container Highest | `#DEDEDE`       |

### On Surface & Outline
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| On Surface              | `#1B1B1F`       |
| On Surface Variant      | `#44464F`       |
| Outline                 | `#747680`       |
| Outline Variant         | `#C4C6D0`       |

### Inverse & Scrim
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Inverse Surface         | `#303034`       |
| Inverse On Surface      | `#F2F0F4`       |
| Inverse Primary         | `#B0C6FF`       |
| Scrim                   | `#000000`       |
| Shadow                  | `#000000`       |

---

## 🌙 Dark Scheme

### Primary
| Token                   | Color (aprox.)  | Descripción                   |
|-------------------------|-----------------|-------------------------------|
| Primary                 | `#4A6CB5`       | Azul medio                    |
| On Primary              | `#FFFFFF`       | Blanco                        |
| Primary Container       | `#5B6ABF`       | Azul medio (más saturado)     |
| On Primary Container    | `#B0C6FF`       | Azul claro                    |

### Secondary
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Secondary               | `#505872`       |
| On Secondary            | `#C0C6DC`       |
| Secondary Container     | `#6B7394`       |
| On Secondary Container  | `#D8DEF8`       |

### Tertiary
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Tertiary                | `#5F5575`       |
| On Tertiary             | `#C0B6D0`       |
| Tertiary Container      | `#7A6E90`       |
| On Tertiary Container   | `#DED0F0`       |

### Error
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Error                   | `#FFB4AB`       |
| On Error                | `#690005`       |
| Error Container         | `#93000A`       |
| On Error Container      | `#FFDAD6`       |

### Surface
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Surface Dim             | `#121316`       |
| Surface                 | `#1B1B1F`       |
| Surface Bright          | `#3A3A40`       |
| Surf. Container Lowest  | `#0E0E11`       |
| Surf. Container Low     | `#1E1E22`       |
| Surf. Container         | `#232328`       |
| Surf. Container High    | `#2D2D32`       |
| Surf. Container Highest | `#38383D`       |

### On Surface & Outline
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| On Surface              | `#E3E2E6`       |
| On Surface Variant      | `#C4C6D0`       |
| Outline                 | `#8E9099`       |
| Outline Variant         | `#44464F`       |

### Inverse & Scrim
| Token                   | Color (aprox.)  |
|-------------------------|-----------------|
| Inverse Surface         | `#E3E2E6`       |
| Inverse On Surface      | `#303034`       |
| Inverse Primary         | `#3B5BA9`       |
| Scrim                   | `#000000`       |
| Shadow                  | `#000000`       |

---

## Uso como CSS Custom Properties

```css
/* === LIGHT SCHEME (default o con clase .light-mode) === */
:root, body.light-mode {
    --md-primary: #3B4685;
    --md-on-primary: #FFFFFF;
    --md-primary-container: #5B6ABF;
    --md-on-primary-container: #1A2460;

    --md-secondary: #585E71;
    --md-on-secondary: #FFFFFF;
    --md-secondary-container: #8B92A8;
    --md-on-secondary-container: #3E4457;

    --md-tertiary: #6E5E7E;
    --md-on-tertiary: #FFFFFF;
    --md-tertiary-container: #9688A5;
    --md-on-tertiary-container: #4A3B5A;

    --md-error: #BA1A1A;
    --md-on-error: #FFFFFF;
    --md-error-container: #FFDAD6;
    --md-on-error-container: #410002;

    --md-surface-dim: #D6D6D6;
    --md-surface: #F5F5F5;
    --md-surface-bright: #F5F5F5;
    --md-surface-container-lowest: #FFFFFF;
    --md-surface-container-low: #F0F0F0;
    --md-surface-container: #EAEAEA;
    --md-surface-container-high: #E4E4E4;
    --md-surface-container-highest: #DEDEDE;

    --md-on-surface: #1B1B1F;
    --md-on-surface-variant: #44464F;
    --md-outline: #747680;
    --md-outline-variant: #C4C6D0;

    --md-inverse-surface: #303034;
    --md-inverse-on-surface: #F2F0F4;
    --md-inverse-primary: #B0C6FF;
    --md-scrim: #000000;
    --md-shadow: #000000;
}

/* === DARK SCHEME === */
:root {
    --md-primary: #4A6CB5;
    --md-on-primary: #FFFFFF;
    --md-primary-container: #5B6ABF;
    --md-on-primary-container: #B0C6FF;

    --md-secondary: #505872;
    --md-on-secondary: #C0C6DC;
    --md-secondary-container: #6B7394;
    --md-on-secondary-container: #D8DEF8;

    --md-tertiary: #5F5575;
    --md-on-tertiary: #C0B6D0;
    --md-tertiary-container: #7A6E90;
    --md-on-tertiary-container: #DED0F0;

    --md-error: #FFB4AB;
    --md-on-error: #690005;
    --md-error-container: #93000A;
    --md-on-error-container: #FFDAD6;

    --md-surface-dim: #121316;
    --md-surface: #1B1B1F;
    --md-surface-bright: #3A3A40;
    --md-surface-container-lowest: #0E0E11;
    --md-surface-container-low: #1E1E22;
    --md-surface-container: #232328;
    --md-surface-container-high: #2D2D32;
    --md-surface-container-highest: #38383D;

    --md-on-surface: #E3E2E6;
    --md-on-surface-variant: #C4C6D0;
    --md-outline: #8E9099;
    --md-outline-variant: #44464F;

    --md-inverse-surface: #E3E2E6;
    --md-inverse-on-surface: #303034;
    --md-inverse-primary: #3B5BA9;
    --md-scrim: #000000;
    --md-shadow: #000000;
}
```
