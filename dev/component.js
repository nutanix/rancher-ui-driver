"use strict";

define("nodes/components/driver-nutanix/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPjxzcGFuPnt7ZHJpdmVyQ29udGVudFRpdGxlfX08L3NwYW4+PC9kaXY+CgoKICAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHwgfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMS4gQWNjb3VudCBBY2Nlc3MiCiAgICAgICAgZGV0YWlsPSJDb25maWd1cmUgdG8gY29ubmVjdCB0byB0aGUgTnV0YW5peCBQcmlzbSBDZW50cmFsIEluc3RhbmNlIgogICAgICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5NYW5hZ2VtZW50IEVuZHBvaW50PC9sYWJlbD4KICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuZW5kcG9pbnQKICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5OdXRhbml4IFByaXNtIENlbnRyYWwgYWRkcmVzczwvcD4KICAgICAgPC9kaXY+CiAgICAgIAogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlVzZXJuYW1lPC9sYWJlbD4KICAgICAgICB7e2lucHV0IAogICAgICAgICAgdHlwZT0idGV4dCIKICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnVzZXJuYW1lCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TnV0YW5peCBtYW5hZ2VtZW50IHVzZXJuYW1lPC9wPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlBhc3N3b3JkPC9sYWJlbD4KICAgICAgICB7e2lucHV0CiAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnBhc3N3b3JkCiAgICAgICAgfX0KICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TnV0YW5peCBtYW5hZ2VtZW50IHBhc3N3b3JkPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgPGRpdiBjbGFzcz0iY2hlY2tib3giPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj57e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPW1vZGVsLm51dGFuaXhDb25maWcuaW5zZWN1cmV9fQogICAgICAgICAgQWxsb3cgaW5zZWN1cmUgY29tbXVuaWNhdGlvbiB0byB0aGUgZW5kcG9pbnQKICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMi4gU2NoZWR1bGluZyIKICAgICAgICBkZXRhaWw9IkNob29zZSB3aGF0IGNsdXN0ZXIgdGhlIHZpcnR1YWwgbWFjaGluZSB3aWxsIGJlIHNjaGVkdWxlZCB0byIKICAgICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIgZm9ybS1sYWJlbCI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNsdXN0ZXI8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuY2x1c3RlcgogICAgICAgIH19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtc20tMTIgY29sLW1kLTQiPgogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5UaGUgbmFtZSBvZiB0aGUgY2x1c3RlciB3aGVyZSBkZXBsb3kgdmlydHVhbCBtYWNoaW5lLjwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMy4gSW5zdGFuY2UiCiAgICAgICAgZGV0YWlsPSJDaG9vc2UgdGhlIHNpemUgYW5kIE9TIG9mIHRoZSB2aXJ0dWFsIG1hY2hpbmUiCiAgICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DUFVzPC9sYWJlbD4KICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICBtaW49MQogICAgICAgICAgICBtYXg9MzIKICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdXMKICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgIH19CiAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+CiAgICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmNwdUNvdW50LnVuaXQiIGNvcmVzPWNvbmZpZy52bUNwdXN9fQogICAgICAgICAgIDwvZGl2PgogICAgICAgICA8L2Rpdj4KICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdVBhc3N0aHJvdWdofX0KICAgICAgICAgICBQYXNzdGhyb3VnaCB0aGUgaG9zdCdzIENQVSBmZWF0dXJlcyB0byB0aGUgVk0KICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk1lbW9yeTwvbGFiZWw+CiAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICAgIG1pbj0xCiAgICAgICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcudm1NZW0KICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPk1CPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlRlbXBsYXRlIEltYWdlPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUltYWdlCiAgICAgICAgICB9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5UaGUgbmFtZSBvZiB0aGUgSW1hZ2UgdG8gdXNlIGFzIHRlbXBsYXRlIGZvciB0aGUgVk08L3A+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Vk0gRGlzayBTaXplPC9sYWJlbD4KICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgICAgbWluPTAKICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUltYWdlU2l6ZQogICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R2lCPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNpemUgdG8gZXh0YW5kIHRoZSB0ZW1wbGF0ZSBkaXNrLiBTZXQgdGhpcyB0byB6ZXJvIGlmIHlvdSBkb24ndCB3YW50IHRvIGV4dGVuZCB0aGUgdGVtcGxhdGUgZGlzay48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkFkZGl0aW9uYWwgRGlzayBTaXplPC9sYWJlbD4KICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgICAgbWluPTAKICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5kaXNrU2l6ZQogICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R2lCPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNpemUgb2YgdGhlIGFkZGl0aW9uYWwgZGlzayB0byBiZSBwcm92aXNpb25lZC4gTGVhdmUgdG8gemVybyBpZiB5b3UgZG9uJ3Qgd2FudCB0byBwcm92aXNpb24gYW4gZXh0cmEgZGlzay48L3A+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+U3RvcmFnZSBDb250YWluZXI8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnN0b3JhZ2VDb250YWluZXIKICAgICAgICAgIH19CiAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlVVSUQgb2YgdGhlIHN0b3JhZ2UgY29udGFpbmVyIHRvIGJlIHVzZWQgZm9yIHRoZSBhZGRpdGlvbmFsIGRpc2suIExlYXZlIGVtcHR5IGlmIHlvdSBkb24ndCB3YW50IHRvIHByb3Zpc2lvbiBhbiBleHRyYSBkaXNrLjwvcD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q2xvdWQgQ29uZmlnIFlBTUw8L2xhYmVsPgogICAgICAgIHt7aW5wdXQteWFtbAogICAgICAgIHNob3dEb3dubG9hZD1mYWxzZQogICAgICAgIHNob3dVcGxvYWQ9ZmFsc2UKICAgICAgICBjYW5DaGFuZ2VOYW1lPWZhbHNlCiAgICAgICAgZ3V0dGVycz0oYXJyYXkpCiAgICAgICAgbWluSGVpZ2h0PTUwMAogICAgICAgIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcuY2xvdWRJbml0CiAgICAgIH19CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAge3tmb3JtLXZhbHVlLWFycmF5CiAgICAgICAgICByZXF1aXJlZD10cnVlCiAgICAgICAgICBpbml0aWFsVmFsdWVzPWluaXROZXR3b3JrCiAgICAgICAgICB2YWx1ZUxhYmVsPSJjbHVzdGVyTmV3Lmdvb2dsZWdrZS5uZXR3b3JrLmxhYmVsIgogICAgICAgICAgYWRkQWN0aW9uTGFiZWw9ImdlbmVyaWMuYWRkIgogICAgICAgICAgdmFsdWVQbGFjZWhvbGRlcj0iZ2VuZXJpYy5uYW1lIgogICAgICAgICAgY2hhbmdlZD0oYWN0aW9uICJuZXR3b3JrQ2hhbmdlZCIpCiAgICAgICAgfX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMiI+CiAgICAgICAge3tmb3JtLWtleS12YWx1ZQogICAgICAgICAgYWxsb3dNdWx0aWxpbmVWYWx1ZT1mYWxzZQogICAgICAgICAgYWxsb3dFbXB0eVZhbHVlPWZhbHNlCiAgICAgICAgICBhZGRBY3Rpb25MYWJlbD0iZ2VuZXJpYy5hZGQiCiAgICAgICAgICBrZXlMYWJlbD0iZ2VuZXJpYy5uYW1lIgogICAgICAgICAga2V5UGxhY2Vob2xkZXI9ImdlbmVyaWMubmFtZSIKICAgICAgICAgIHZhbHVlUGxhY2Vob2xkZXI9InZhbHVlIgogICAgICAgICAgaW5pdGlhbEFycmF5PWluaXRDYXRlZ29yeQogICAgICAgICAgY2hhbmdlZEFycmF5PShhY3Rpb24gImNhdGVnb3J5Q2hhbmdlZCIpCiAgICAgICAgICBoZWFkZXI9ICJWTSBDYXRlZ29yaWVzIgogICAgICAgIH19CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CiAge3svYWNjb3JkaW9uLWxpc3R9fQoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj4KICAgICAgPHNwYW4+CiAgICAgICAge3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19CiAgICAgIDwvc3Bhbj4KICAgIDwvZGl2PgoKICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgIG1vZGVsPW1vZGVsCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICAgIHJvd0NsYXNzPSJyb3cgbWItMTAiCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKQogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLW5vZGUtdGFpbnRzCiAgICBtb2RlbD1tb2RlbAogICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICBtYWNoaW5lPW1vZGVsCiAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgfX0KCiAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyBlcnJvcnMgcHJvZHVjZWQgYnkgdmFsaWRhdGUoKSBpbiB0aGUgY29tcG9uZW50IC0tfX0KICAgIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAgICB7e3NhdmUtY2FuY2VsIHNhdmU9InNhdmUiIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKX19CiAgPC9kaXY+Cjwvc2VjdGlvbj4=";
  const computed = Ember.computed;
  const get = Ember.get;
  const set = Ember.set;
  const alias = Ember.computed.alias;
  const service = Ember.inject.service;
  const defaultRadix = 10;
  const defaultBase = 1024;

  const stringsToParams = (params, str) => {
    const index = str.indexOf('=');

    if (index > -1) {
      params.push({
        key: str.slice(0, index),
        value: str.slice(index + 1)
      });
    }

    return params;
  };

  const paramsToStrings = (strs, param) => {
    if (param.value && param.key) {
      strs.push(`${param.key}=${param.value}`);
    }

    return strs;
  };

  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'nutanix',
    config: alias('model.nutanixConfig'),
    app: service(),
    initCategory: null,
    initNetwork: null,

    init() {
      const decodedLayout = window.atob(LAYOUT);
      const template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-nutanix/template'
      });
      set(this, 'layout', template);

      this._super(...arguments);

      this.initCategoryParams('config.vmCategories', 'initCategory');
      this.initNetworkParams('config.vmNetwork', 'initNetwork');
    },

    bootstrap: function () {
      let config = get(this, 'globalStore').createRecord({
        type: 'nutanixConfig',
        username: "admin",
        vmCpus: 2,
        vmCores: 1,
        vmMem: 4096,
        vmCpuPassthrough: false,
        vmImage: "",
        vmImageSize: 0,
        vmNetwork: [],
        vmCategories: [],
        cluster: "",
        insecure: true,
        storageContainer: "",
        diskSize: 0,
        cloudInit: "#cloud-config\n\n"
      });
      set(this, 'model.nutanixConfig', config);
    },

    validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (parseInt(get(this, 'config.vmMem'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },

    actions: {
      categoryChanged(array) {
        this.updateCategoryParams('config.vmCategories', array);
      },

      networkChanged(array) {
        this.updateNetwork('config.vmNetwork', array);
      }

    },

    initCategoryParams(pairsKey, paramsKey) {
      set(this, paramsKey, (get(this, pairsKey) || []).reduce(stringsToParams, []));
    },

    updateCategoryParams(pairsKey, params) {
      set(this, pairsKey, params.reduce(paramsToStrings, []));
    },

    initNetworkParams(pairsKey, paramsKey) {
      set(this, paramsKey, get(this, pairsKey) || []);
    },

    updateNetwork(pairsKey, networks) {
      set(this, pairsKey, networks);
    }

  });
});;
"use strict";

define("ui/components/driver-nutanix/component", ["exports", "nodes/components/driver-nutanix/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});