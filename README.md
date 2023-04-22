# pppoe server
check chap and mschap1
unckeck pap and mschap2

# log connection ipv4 and ipv6

```
  :global URLUP "URL_TIO_API:PORT/mikrotik/connectionslog";
  :global checkconnection "URL_TIO_API";
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
  :local t 60;
  while ($i < $t && [ :len [/ipv6 dhcp-server binding find server=$interfaceName] ] < $x) do={
    :put $i
    :set $i ($i + 1)
    :delay delay-time=1s
  }
  if ($i = $t) do={
    :log warning message="CLIENTE CONECTADO > SEND TO TIO API :  $user | $callerId | $calledId | $remoteAddr | $localAddr | $RemoteIPv6 | NULL"
    /tool fetch url="$URLUP" http-data="action=i&user=$user&mac=$callerId&nas=$localAddr&service=$calledId&ipv4=$remoteAddr&remoteipv6=$RemoteIPv6" http-method=post
  } else={
    :local DHCPv6PD [/ipv6 dhcp-server binding get value-name=address [find server=$interfaceName]]
    :log warning message="CLIENTE CONECTADO > SEND TO TIO API : $user | $callerId | $calledId | $remoteAddr | $localAddr | $RemoteIPv6 | $DHCPv6PD"
    /tool fetch url="$URLUP" http-data="action=i&user=$user&mac=$callerId&nas=$localAddr&service=$calledId&ipv4=$remoteAddr&remoteipv6=$RemoteIPv6&dhcpv6pd=$DHCPv6PD" http-method=post
  }
  file remove log6.php
```