# pppoe server
check chap and mschap1
unckeck pap and mschap2

## log connection ipv4 and ipv6
baseado em https://blog.remontti.com.br/3931

# script PPPOE Profile On UP

```
{
  
  :global URL "http://192.168.111.106:3002/mikrotik/connectionslog";
  :global checkconnection "192.168.111.106";
  :local ii 0;
  :local tt 300; # Aguarda até 5min para tentar 

  while ( $ii < $tt && ([/ping $checkconnection count=1]=0) ) do={
    :put $ii
    :set $ii ($ii + 1)
    :delay delay-time=1s
    :log error "Aguardando Conexao... $checkconnection";
  }

  :local localAddr $"local-address"
  :local remoteAddr $"remote-address"
  :local callerId $"caller-id"
  :local calledId $"called-id"
  :local interfaceName [/interface get $interface name]
  :local RemoteIPv6 [/ipv6 nd prefix get value-name=prefix [find interface=$interfaceName]]
  :local i 0;
  :local x 1;  
  :local t 60; # Segundos aguardando ipv6 ser configurado no cliente

  while ($i < $t && [ :len [/ipv6 dhcp-server binding find server=$interfaceName] ] < $x) do={
    :put $i
    :set $i ($i + 1)
    :delay delay-time=1s
  }

  if ($i = $t) do={

    :log warning message="[TIO API] CLIENTE CONECTADO :  $user | $callerId | $calledId | $remoteAddr | $localAddr | $RemoteIPv6 | NULL"
    /tool fetch url="$URL" http-data="interface=$interfaceName&action=c&user=$user&mac=$callerId&nas=$localAddr&service=$calledId&ipv4=$remoteAddr&remoteipv6=$RemoteIPv6" http-method=post

  } else={

    :local DHCPv6PD [/ipv6 dhcp-server binding get value-name=address [find server=$interfaceName]]
    :log warning message="[TIO API] CLIENTE CONECTADO : $user | $callerId | $calledId | $remoteAddr | $localAddr | $RemoteIPv6 | $DHCPv6PD"
    /tool fetch url="$URL" http-data="interface=$interfaceName&action=c&user=$user&mac=$callerId&nas=$localAddr&service=$calledId&ipv4=$remoteAddr&remoteipv6=$RemoteIPv6&dhcpv6pd=$DHCPv6PD" http-method=post

  }
}

```
# script PPPOE Profile On DOWN
```
{
  :global URL "http://192.168.111.106:3002/mikrotik/connectionslog";
  :local localAddr $"local-address"
  :local callerId $"caller-id"
  /tool fetch url="$URL" http-data="action=d&user=$user&mac=$callerId&nas=$localAddr" http-method=post
  :log warning message="CLIENTE DESCONECTADO: $user | $callerId | $localAddr"
}

